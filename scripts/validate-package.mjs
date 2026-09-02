#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}

await walk(root);
const failures = [];
const relative = (path) => path.slice(root.length + 1);
const required = [
  'SKILL.md', 'HANDBOOK.md', 'package.json', 'package-lock.json',
  'assets/baselines/corporate-master.json', 'assets/schemas/build-plan.schema.json', 'assets/schemas/qa-plan.schema.json',
  'scripts/mcp-client.mjs', 'scripts/rest-client.mjs', 'scripts/elementor-build.mjs', 'scripts/cdp-qa.mjs',
  'assets/project-starter/AGENTS.md', 'assets/project-starter/AI-START-HERE.md', 'assets/project-starter/docs/STATUS.md'
];
for (const path of required) if (!files.includes(join(root, path))) failures.push(`Missing required file: ${path}`);

for (const path of files) {
  const rel = relative(path);
  if (rel.split('/').some((part) => part === '.DS_Store' || part === '__MACOSX' || part.startsWith('._'))) failures.push(`macOS metadata: ${rel}`);
  if (extname(path) === '.json') {
    try { JSON.parse(await readFile(path, 'utf8')); } catch (error) { failures.push(`Invalid JSON ${rel}: ${error.message}`); }
  }
  if (extname(path) === '.mjs' && rel !== 'scripts/validate-package.mjs') {
    const source = await readFile(path, 'utf8');
    for (const pattern of [/web-tongluc/i, /\/Users\/levanthuc/, /localhost/i, /Tổng Lực/i, /\b2026\b/]) {
      if (pattern.test(source)) failures.push(`Project-specific value in reusable script ${rel}: ${pattern}`);
    }
  }
  if (extname(path) === '.md') {
    const source = await readFile(path, 'utf8');
    const links = [...source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1].split('#')[0]);
    for (const link of links) {
      if (!link || /^(https?:|mailto:|tel:|#|\{)/.test(link) || link.includes('*')) continue;
      const target = resolve(dirname(path), decodeURIComponent(link));
      if (!files.includes(target)) failures.push(`Broken Markdown link in ${rel}: ${link}`);
    }
  }
}

if (files.includes(join(root, 'assets/templates/master-blueprint.json'))) failures.push('Project-specific master-blueprint.json must be removed or moved to examples.');

const baseline = JSON.parse(await readFile(join(root, 'assets/baselines/corporate-master.json'), 'utf8'));
const targets = baseline.contract?.targets || {};
const contractChecks = [
  ['homepage', 50], ['contact', 55], ['about', 57], ['footer', 59], ['contact_form', '843524c']
];
for (const [role, expected] of contractChecks) if (targets[role]?.expected_id !== expected) failures.push(`Corporate baseline mismatch: ${role}`);
if (baseline.contract?.menus?.primary?.expected_name !== 'Primary Menu') failures.push('Corporate baseline Primary Menu mismatch.');
if (baseline.contract?.menus?.off_canvas?.expected_name !== 'Off-Canvas Menu') failures.push('Corporate baseline Off-Canvas Menu mismatch.');

const status = await readFile(join(root, 'assets/project-starter/docs/STATUS.md'), 'utf8');
for (const field of ['Project profile:', 'Baseline version:', 'Baseline verification:', 'Execution mode:', 'Execution strategy:', 'Current requested scope:', 'Current task type:', 'Current revision intent:', 'Direct dependencies:', 'Next Recommended Action:']) {
  if (!status.includes(field)) failures.push(`STATUS missing field: ${field}`);
}

const skill = await readFile(join(root, 'SKILL.md'), 'utf8');
const agents = await readFile(join(root, 'assets/project-starter/AGENTS.md'), 'utf8');
const authority = 'Owner Direction > Active Requested Scope > Next Recommended Action > Guided Flow';
if (!skill.includes(authority) || !agents.includes(authority)) failures.push('Authority order missing from SKILL.md or starter AGENTS.md.');

if (failures.length) {
  process.stderr.write(`${failures.map((item) => `- ${item}`).join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(`Package validation passed: ${files.length} files checked.\n`);
