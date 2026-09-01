import { readFile } from 'node:fs/promises';
import { Client } from 'file:///Users/levanthuc/.npm/_npx/d036eb0573a6a23a/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport } from 'file:///Users/levanthuc/.npm/_npx/d036eb0573a6a23a/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';

const [, , command = 'list', toolName, rawArgs = '{}'] = process.argv;
const configPath = '/Applications/XAMPP/xamppfiles/htdocs/web-tongluc/mcp-config.json';
const config = JSON.parse(await readFile(configPath, 'utf8'));
const server = config.mcpServers?.['localhost-global'];

if (!server?.command || !Array.isArray(server.args) || !server.env) {
  throw new Error('Missing localhost-global MCP server configuration.');
}

const transport = new StdioClientTransport({
  command: server.command,
  args: server.args,
  env: {
    ...process.env,
    ...server.env,
    WP_API_URL: process.env.TONGLUC_MCP_TARGET === 'astra'
      ? new URL('/web-tongluc/wp-json/astra/v1/mcp', server.env.WP_API_URL).toString()
      : process.env.TONGLUC_MCP_TARGET === 'uae'
        ? new URL('/web-tongluc/wp-json/uae/mcp', server.env.WP_API_URL).toString()
        : server.env.WP_API_URL,
    OAUTH_ENABLED: 'false',
  },
  cwd: '/Applications/XAMPP/xamppfiles/htdocs/web-tongluc',
  stderr: 'pipe',
});

const stderrChunks = [];
transport.stderr?.on('data', (chunk) => stderrChunks.push(String(chunk)));

const client = new Client({ name: 'codex-tongluc-jit', version: '1.0.0' });

try {
  await client.connect(transport);
  if (command === 'list') {
    const result = await client.listTools();
    process.stdout.write(`${JSON.stringify({ server: client.getServerVersion(), tools: result.tools }, null, 2)}\n`);
  } else if (command === 'list-filter') {
    const pattern = toolName ? new RegExp(toolName, 'i') : /.*/;
    const result = await client.listTools();
    process.stdout.write(`${JSON.stringify({
      server: client.getServerVersion(),
      tools: result.tools.filter((tool) => pattern.test(tool.name) || pattern.test(tool.description || '')),
    }, null, 2)}\n`);
  } else if (command === 'discover-filter') {
    const pattern = toolName ? new RegExp(toolName, 'i') : /.*/;
    const result = await client.callTool({ name: 'mcp-adapter-discover-abilities', arguments: {} });
    const block = result.content?.find((item) => item.type === 'text');
    const parsed = block?.text ? JSON.parse(block.text) : { abilities: [] };
    const abilities = (parsed.abilities || []).filter((ability) => pattern.test(ability.name) || pattern.test(ability.label) || pattern.test(ability.description));
    process.stdout.write(`${JSON.stringify({ abilities }, null, 2)}\n`);
  } else if (command === 'info-many') {
    const abilityNames = JSON.parse(rawArgs);
    const abilities = [];
    for (const ability_name of abilityNames) {
      const result = await client.callTool({
        name: 'mcp-adapter-get-ability-info',
        arguments: { ability_name },
      });
      const block = result.content?.find((item) => item.type === 'text');
      let info = result.structuredContent || null;
      if (block?.text) {
        try { info = JSON.parse(block.text); } catch { info = { raw: block.text }; }
      }
      abilities.push({ ability_name, info });
    }
    process.stdout.write(`${JSON.stringify({ abilities }, null, 2)}\n`);
  } else if (command === 'schema-many') {
    const abilityNames = JSON.parse(rawArgs);
    const abilities = [];
    for (const ability_name of abilityNames) {
      const result = await client.callTool({
        name: 'mcp-adapter-get-ability-info',
        arguments: { ability_name },
      });
      const block = result.content?.find((item) => item.type === 'text');
      let info = result.structuredContent || null;
      if (block?.text) {
        try { info = JSON.parse(block.text); } catch { info = { raw: block.text }; }
      }
      abilities.push({
        ability_name,
        input_schema: info?.input_schema,
        annotations: info?.meta?.annotations,
        version: info?.meta?.version,
      });
    }
    process.stdout.write(`${JSON.stringify({ abilities }, null, 2)}\n`);
  } else if (command === 'execute-many') {
    const requests = JSON.parse(rawArgs);
    const results = [];
    for (const request of requests) {
      const result = await client.callTool({
        name: 'mcp-adapter-execute-ability',
        arguments: {
          ability_name: request.ability_name,
          parameters: request.parameters || {},
        },
      });
      const block = result.content?.find((item) => item.type === 'text');
      let response = result.structuredContent || null;
      if (block?.text) {
        try { response = JSON.parse(block.text); } catch { response = { raw: block.text }; }
      }
      results.push({ ability_name: request.ability_name, response });
      if (response?.success === false) break;
    }
    process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
  } else if (command === 'build-file-uae') {
    const specs = JSON.parse(await readFile(toolName, 'utf8'));
    const results = [];
    for (const spec of specs) {
      const build = await client.callTool({
        name: 'uae-builder-build',
        arguments: { post_id: spec.post_id, structure: JSON.stringify(spec.structure) },
      });
      const buildText = build.content?.find((item) => item.type === 'text')?.text;
      let buildResult = build.structuredContent || null;
      if (buildText) {
        try { buildResult = JSON.parse(buildText); } catch { buildResult = { raw: buildText }; }
      }
      if (build.isError || buildResult?.success === false) {
        results.push({ post_id: spec.post_id, name: spec.name, build: buildResult, isError: build.isError === true });
        break;
      }
      const css = await client.callTool({ name: 'uae-builder-regenerate-css', arguments: { post_id: spec.post_id } });
      const cssText = css.content?.find((item) => item.type === 'text')?.text;
      let cssResult = css.structuredContent || null;
      if (cssText) {
        try { cssResult = JSON.parse(cssText); } catch { cssResult = { raw: cssText }; }
      }
      results.push({ post_id: spec.post_id, name: spec.name, build: buildResult, css: cssResult });
    }
    process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
  } else if (command === 'get-many-uae') {
    const ids = JSON.parse(toolName);
    const results = [];
    for (const post_id of ids) {
      const response = await client.callTool({ name: 'uae-builder-get-structure', arguments: { post_id, full: true } });
      const responseText = response.content?.find((item) => item.type === 'text')?.text;
      let data = response.structuredContent || null;
      if (responseText) {
        try { data = JSON.parse(responseText); } catch { data = { raw: responseText }; }
      }
      const widgets = [];
      const walk = (elements = []) => {
        for (const element of elements) {
          if (element.widgetType) {
            const settings = element.settings || {};
            widgets.push({
              widgetType: element.widgetType,
              header_size: settings.header_size,
              title: settings.title || settings.infobox_title,
              text: settings.text,
              shortcode: settings.shortcode,
              editor: typeof settings.editor === 'string' ? settings.editor.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) : undefined,
            });
          }
          walk(element.elements || []);
        }
      };
      walk(data?.elements || []);
      results.push({
        post_id,
        post_title: data?.post_title,
        post_type: data?.post_type,
        layout_mode: data?.layout_mode,
        top_level_elements: data?.elements?.length || 0,
        widget_count: widgets.length,
        h1: widgets.filter((widget) => widget.widgetType === 'heading' && widget.header_size === 'h1').map((widget) => widget.title),
        shortcodes: widgets.filter((widget) => widget.shortcode).map((widget) => widget.shortcode),
        widget_types: [...new Set(widgets.map((widget) => widget.widgetType))],
      });
    }
    process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
  } else if (command === 'call') {
    if (!toolName) throw new Error('Tool name is required for call.');
    const args = JSON.parse(rawArgs);
    const result = await client.callTool({ name: toolName, arguments: args });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    throw new Error(`Unsupported command: ${command}`);
  }
} catch (error) {
  const safeStderr = stderrChunks.join('').replace(/(password|authorization):?\s*[^\s]+/gi, '$1=<redacted>');
  if (safeStderr) process.stderr.write(safeStderr);
  throw error;
} finally {
  await client.close().catch(() => undefined);
}
