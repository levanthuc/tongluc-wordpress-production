#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { parseArgs, requireOption } from './lib/cli.mjs';
import { readJson, redact, writeJson } from './lib/json.mjs';
import { executeAbility, findAdapterTools, getAbilityInfo, openMcpSession } from './lib/mcp.mjs';
import { validateAgainstSchema } from './lib/schema.mjs';

function validateOperation(operation, label) {
  if (!operation || typeof operation.ability !== 'string' || !operation.ability || !operation.parameters || typeof operation.parameters !== 'object') {
    throw new Error(`Invalid ${label} operation; ability and parameters are required.`);
  }
}

function validatePlan(plan) {
  if (plan?.schema_version !== '1.0.0') throw new Error('Unsupported build plan schema_version.');
  if (!plan.project?.name) throw new Error('Build plan project.name is required.');
  if (!Array.isArray(plan.targets) || plan.targets.length === 0) throw new Error('Build plan requires at least one target.');
  for (const [index, target] of plan.targets.entries()) {
    if (!target.name || !target.expected_post_type || !target.structure || !target.operations) throw new Error(`Target ${index} is incomplete.`);
    if (target.expected_id === undefined && !target.baseline_role) throw new Error(`Target ${target.name} needs expected_id or baseline_role.`);
    validateOperation(target.operations.verify, `${target.name}.verify`);
    validateOperation(target.operations.write, `${target.name}.write`);
    validateOperation(target.operations.readback, `${target.name}.readback`);
    if (target.operations.regenerate_css) validateOperation(target.operations.regenerate_css, `${target.name}.regenerate_css`);
  }
}

function resolveBaselineTarget(target, baseline) {
  if (target.expected_id !== undefined) return { ...target, resolved_id: target.expected_id };
  const entry = baseline?.contract?.targets?.[target.baseline_role];
  if (!entry) throw new Error(`Baseline role not found: ${target.baseline_role}`);
  if (entry.expected_post_type && entry.expected_post_type !== target.expected_post_type) {
    throw new Error(`Baseline post type mismatch for ${target.name}: ${entry.expected_post_type} != ${target.expected_post_type}`);
  }
  return { ...target, resolved_id: entry.expected_id };
}

function substitute(value, context) {
  if (Array.isArray(value)) return value.map((item) => substitute(item, context));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, substitute(child, context)]));
  if (value === '$TARGET_ID') return context.targetId;
  if (value === '$STRUCTURE') return context.structure;
  if (value === '$STRUCTURE_JSON') return JSON.stringify(context.structure);
  return value;
}

function valuesForKey(value, key, found = []) {
  if (Array.isArray(value)) value.forEach((item) => valuesForKey(item, key, found));
  else if (value && typeof value === 'object') {
    for (const [childKey, child] of Object.entries(value)) {
      if (childKey === key) found.push(child);
      valuesForKey(child, key, found);
    }
  }
  return found;
}

function assertIdentity(payload, target) {
  const ids = [...valuesForKey(payload, 'id'), ...valuesForKey(payload, 'post_id')].map(String);
  const types = [...valuesForKey(payload, 'post_type'), ...valuesForKey(payload, 'type')].map(String);
  if (!ids.includes(String(target.resolved_id))) throw new Error(`Target verification did not return expected ID ${target.resolved_id} for ${target.name}.`);
  if (!types.includes(String(target.expected_post_type))) throw new Error(`Target verification did not return expected post type ${target.expected_post_type} for ${target.name}.`);
}

function findElements(value) {
  if (!value || typeof value !== 'object') return null;
  if (Array.isArray(value.elements)) return value.elements;
  for (const child of Object.values(value)) {
    const result = findElements(child);
    if (result) return result;
  }
  return null;
}

function hash(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

const { options } = parseArgs(process.argv.slice(2));
const planPath = resolve(requireOption(options, 'plan'));
const baselinePath = options.baseline ? resolve(options.baseline) : null;
const plan = await readJson(planPath);
await validateAgainstSchema(plan, resolve(new URL('../assets/schemas/build-plan.schema.json', import.meta.url).pathname), 'Build plan');
validatePlan(plan);
const baseline = baselinePath ? await readJson(baselinePath) : null;
if (baseline && plan.project.baseline_id && baseline.baseline?.id !== plan.project.baseline_id) throw new Error('Build plan baseline_id does not match baseline manifest.');
if (baseline && plan.project.baseline_version && baseline.baseline?.version !== plan.project.baseline_version) throw new Error('Build plan baseline_version does not match baseline manifest.');

const session = await openMcpSession({
  configPath: options.config || process.env.TONGLUC_MCP_CONFIG,
  serverName: options.server,
  endpointOverride: options.endpoint,
  clientName: 'tongluc-elementor-build'
});

const report = {
  plan: planPath,
  baseline: baselinePath,
  mode: options.execute === true ? 'execute' : 'dry-run',
  started_at: new Date().toISOString(),
  targets: []
};

try {
  const adapter = await findAdapterTools(session.client);
  const liveInfo = new Map();
  const infoFor = async (ability) => {
    if (!liveInfo.has(ability)) liveInfo.set(ability, await getAbilityInfo(session.client, adapter, ability));
    return liveInfo.get(ability);
  };
  const runOperation = async (operation, context) => {
    await infoFor(operation.ability);
    return executeAbility(session.client, adapter, operation.ability, substitute(operation.parameters, context));
  };

  for (const rawTarget of plan.targets) {
    const target = resolveBaselineTarget(rawTarget, baseline);
    const context = { targetId: target.resolved_id, structure: target.structure };
    const targetReport = { name: target.name, target_id: target.resolved_id, expected_post_type: target.expected_post_type };
    report.targets.push(targetReport);

    const verification = await runOperation(target.operations.verify, context);
    assertIdentity(verification, target);
    targetReport.target_verified = true;

    const current = await runOperation(target.operations.readback, context);
    const currentElements = findElements(current);
    const desiredHash = hash(target.structure);
    const currentHash = currentElements ? hash(currentElements) : null;
    targetReport.preflight = { desired_hash: desiredHash, current_hash: currentHash, unchanged: currentHash === desiredHash };

    await infoFor(target.operations.write.ability);
    if (target.operations.regenerate_css) await infoFor(target.operations.regenerate_css.ability);
    if (options.execute !== true) {
      targetReport.result = 'dry-run-ready';
      continue;
    }
    if (targetReport.preflight.unchanged && target.skip_if_unchanged !== false) {
      targetReport.result = 'skipped-unchanged';
      continue;
    }

    await runOperation(target.operations.write, context);
    targetReport.write = 'completed';
    if (target.operations.regenerate_css) {
      await runOperation(target.operations.regenerate_css, context);
      targetReport.css = 'regenerated';
    }
    const readback = await runOperation(target.operations.readback, context);
    assertIdentity(readback, target);
    const readbackElements = findElements(readback);
    targetReport.readback = {
      identity_verified: true,
      structure_hash: readbackElements ? hash(readbackElements) : null,
      desired_hash: desiredHash,
      exact_structure_match: readbackElements ? hash(readbackElements) === desiredHash : null
    };
    if (target.expect?.exact_structure_match === true && targetReport.readback.exact_structure_match !== true) {
      throw new Error(`Read-back structure mismatch for ${target.name}.`);
    }
    targetReport.result = 'written-and-read-back';
  }
  report.status = 'success';
} catch (error) {
  report.status = 'failed';
  report.error = error.message;
  process.exitCode = 1;
} finally {
  report.finished_at = new Date().toISOString();
  await session.client.close().catch(() => undefined);
}

const safeReport = redact(report);
if (options.report) await writeJson(resolve(options.report), safeReport);
process.stdout.write(`${JSON.stringify(safeReport, null, 2)}\n`);
