import { resolve } from 'node:path';
import { readJson } from './json.mjs';

export async function loadMcpServer(configPath, requestedServer) {
  if (!configPath) throw new Error('Use --config <path> or set TONGLUC_MCP_CONFIG.');
  const absoluteConfigPath = resolve(configPath);
  const config = await readJson(absoluteConfigPath);
  const entries = Object.entries(config.mcpServers || {});
  if (entries.length === 0) throw new Error('No mcpServers entries found in config.');
  const selected = requestedServer
    ? entries.find(([name]) => name === requestedServer)
    : entries.length === 1 ? entries[0] : null;
  if (!selected) throw new Error('Select an MCP server with --server <name>.');
  const [name, server] = selected;
  if (!server?.command || !Array.isArray(server.args)) throw new Error(`Invalid MCP server config: ${name}`);
  return {
    name,
    configPath: absoluteConfigPath,
    command: server.command,
    args: server.args,
    cwd: server.cwd ? resolve(server.cwd) : process.cwd(),
    env: { ...server.env }
  };
}

export function wordpressConnection(server, endpointOverride) {
  const endpoint = endpointOverride || server.env.WP_API_URL;
  const username = server.env.WP_API_USERNAME;
  const password = server.env.WP_API_PASSWORD;
  if (!endpoint || !username || !password) throw new Error('Selected server is missing WP_API_URL/WP_API_USERNAME/WP_API_PASSWORD.');
  const parsed = new URL(endpoint);
  const apiPath = parsed.pathname.includes('/wp-json/')
    ? parsed.pathname.slice(0, parsed.pathname.indexOf('/wp-json/') + '/wp-json'.length)
    : `${parsed.pathname.replace(/\/$/, '')}/wp-json`;
  return {
    endpoint,
    apiRoot: `${parsed.origin}${apiPath}`,
    username,
    password
  };
}
