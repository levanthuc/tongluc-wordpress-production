#!/usr/bin/env node
import { parseArgs, requireOption } from './lib/cli.mjs';
import { extractToolPayload, readJsonInput, redact } from './lib/json.mjs';
import { abilityIsReadOnly, executeAbility, findAdapterTools, getAbilityInfo, openMcpSession } from './lib/mcp.mjs';

const { options, positional } = parseArgs(process.argv.slice(2));
const [command = 'list', subject] = positional;
const configPath = options.config || process.env.TONGLUC_MCP_CONFIG;
const session = await openMcpSession({
  configPath,
  serverName: options.server,
  endpointOverride: options.endpoint,
  clientName: 'tongluc-mcp-client'
});

try {
  const adapter = await findAdapterTools(session.client);
  let output;
  if (command === 'list') {
    output = { server: session.client.getServerVersion(), tools: adapter.tools };
  } else if (command === 'discover') {
    if (!adapter.discover) throw new Error('MCP adapter discover tool was not found.');
    const result = await session.client.callTool({ name: adapter.discover, arguments: {} });
    const payload = extractToolPayload(result) || {};
    const filter = options.filter ? new RegExp(options.filter, 'i') : null;
    output = filter
      ? { abilities: (payload.abilities || []).filter((item) => filter.test(JSON.stringify(item))) }
      : payload;
  } else if (command === 'info' || command === 'schema') {
    if (!subject) throw new Error(`Usage: ${command} <ability> --config <path>`);
    const info = await getAbilityInfo(session.client, adapter, subject);
    output = command === 'schema'
      ? { ability: subject, input_schema: info?.input_schema, annotations: info?.meta?.annotations || info?.annotations, version: info?.meta?.version }
      : info;
  } else if (command === 'execute' || command === 'read') {
    if (!subject) throw new Error(`Usage: ${command} <ability> --input <json-or-path> --config <path>`);
    const info = await getAbilityInfo(session.client, adapter, subject);
    const readOnly = abilityIsReadOnly(info);
    if (command === 'read' && readOnly === false) throw new Error('Requested ability is not read-only; use execute with --allow-write.');
    if (command === 'execute' && readOnly !== true && options['allow-write'] !== true) {
      throw new Error('Ability may write. Re-run with --allow-write after resolving target and scope.');
    }
    output = await executeAbility(session.client, adapter, subject, await readJsonInput(options.input || '{}'));
  } else if (command === 'call') {
    const toolName = subject || requireOption(options, 'tool');
    if (options['allow-write'] !== true) throw new Error('Raw tool calls require --allow-write because write intent cannot be inferred safely.');
    output = extractToolPayload(await session.client.callTool({ name: toolName, arguments: await readJsonInput(options.input || '{}') }));
  } else {
    throw new Error('Commands: list | discover | info <ability> | schema <ability> | read <ability> | execute <ability> | call <tool>');
  }
  process.stdout.write(`${JSON.stringify(redact(output), null, 2)}\n`);
} finally {
  await session.client.close().catch(() => undefined);
}
