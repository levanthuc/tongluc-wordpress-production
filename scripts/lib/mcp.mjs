import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { loadMcpServer } from './config.mjs';
import { extractToolPayload } from './json.mjs';

export async function openMcpSession({ configPath, serverName, endpointOverride, clientName = 'tongluc-wordpress-tooling' }) {
  const server = await loadMcpServer(configPath, serverName);
  const transport = new StdioClientTransport({
    command: server.command,
    args: server.args,
    cwd: server.cwd,
    env: {
      ...process.env,
      ...server.env,
      ...(endpointOverride ? { WP_API_URL: endpointOverride } : {}),
      OAUTH_ENABLED: server.env.OAUTH_ENABLED || 'false'
    },
    stderr: 'pipe'
  });
  const stderr = [];
  transport.stderr?.on('data', (chunk) => stderr.push(String(chunk)));
  const client = new Client({ name: clientName, version: '2.0.0' });
  try {
    await client.connect(transport);
  } catch (error) {
    const safe = stderr.join('').replace(/(password|authorization|token)\s*[:=]\s*\S+/gi, '$1=<redacted>');
    if (safe) process.stderr.write(safe);
    throw error;
  }
  return { client, transport, server };
}

export async function findAdapterTools(client) {
  const tools = (await client.listTools()).tools || [];
  const bySuffix = (suffix) => tools.find((tool) => tool.name === suffix || tool.name.endsWith(suffix))?.name;
  return {
    tools,
    discover: bySuffix('mcp-adapter-discover-abilities'),
    info: bySuffix('mcp-adapter-get-ability-info'),
    execute: bySuffix('mcp-adapter-execute-ability')
  };
}

export async function getAbilityInfo(client, adapter, abilityName) {
  if (!adapter.info) throw new Error('MCP adapter get-ability-info tool was not found.');
  const result = await client.callTool({ name: adapter.info, arguments: { ability_name: abilityName } });
  if (result.isError) throw new Error(`Ability info failed: ${abilityName}`);
  return extractToolPayload(result);
}

export async function executeAbility(client, adapter, abilityName, parameters) {
  if (!adapter.execute) throw new Error('MCP adapter execute-ability tool was not found.');
  const result = await client.callTool({
    name: adapter.execute,
    arguments: { ability_name: abilityName, parameters: parameters || {} }
  });
  const payload = extractToolPayload(result);
  if (result.isError || payload?.success === false) throw new Error(`Ability execution failed: ${abilityName}`);
  return payload;
}

export function abilityIsReadOnly(info) {
  const annotations = info?.meta?.annotations || info?.annotations || {};
  if (annotations.readOnlyHint === true || annotations.read_only === true) return true;
  if (annotations.destructiveHint === true || annotations.idempotentHint === false) return false;
  return null;
}
