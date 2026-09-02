#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { parseArgs, positiveInteger } from './lib/cli.mjs';
import { loadMcpServer, wordpressConnection } from './lib/config.mjs';
import { readJsonInput, redact } from './lib/json.mjs';

const mimeTypes = {
  '.avif': 'image/avif', '.gif': 'image/gif', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.pdf': 'application/pdf'
};

const { options, positional } = parseArgs(process.argv.slice(2));
const [command = 'get', subject] = positional;
const server = await loadMcpServer(options.config || process.env.TONGLUC_MCP_CONFIG, options.server);
const connection = wordpressConnection(server, options.endpoint);
const timeoutMs = positiveInteger(options.timeout, 20000);
const authorization = `Basic ${Buffer.from(`${connection.username}:${connection.password}`).toString('base64')}`;

async function request(path, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url = /^https?:\/\//i.test(path) ? path : `${connection.apiRoot}${path.startsWith('/') ? path : `/${path}`}`;
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { authorization, accept: 'application/json', ...(init.headers || {}) }
    });
    const text = await response.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text.slice(0, positiveInteger(options['max-body'], 200000)); }
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${JSON.stringify(redact(body)).slice(0, 2000)}`);
    return { status: response.status, body };
  } finally {
    clearTimeout(timer);
  }
}

let output;
if (command === 'get') {
  if (!subject) throw new Error('Usage: get <REST path> --config <path>');
  output = await request(subject);
} else if (command === 'upload') {
  if (!subject) throw new Error('Usage: upload <file> --config <path>');
  const filename = options.name || basename(subject);
  const mime = options.mime || mimeTypes[extname(filename).toLowerCase()];
  if (!mime) throw new Error('Unknown MIME type. Supply --mime <type>.');
  output = await request(options.path || '/wp/v2/media', {
    method: 'POST',
    headers: {
      'content-type': mime,
      'content-disposition': `attachment; filename="${filename.replace(/["\\]/g, '')}"`
    },
    body: await readFile(subject)
  });
  const media = output.body || {};
  output = { status: output.status, body: { id: media.id, slug: media.slug, source_url: media.source_url, mime_type: media.mime_type, media_details: media.media_details } };
} else if (command === 'write') {
  if (!subject) throw new Error('Usage: write <REST path> --method POST --input <json-or-path> --allow-write --reason <text>');
  if (options['allow-write'] !== true || typeof options.reason !== 'string' || options.reason.length < 5) {
    throw new Error('Arbitrary REST write is an escape hatch and requires --allow-write --reason <text>.');
  }
  const method = String(options.method || 'POST').toUpperCase();
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) throw new Error(`Unsupported write method: ${method}`);
  output = await request(subject, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(await readJsonInput(options.input || '{}'))
  });
  output.reason = options.reason;
} else {
  throw new Error('Commands: get <path> | upload <file> | write <path>');
}

process.stdout.write(`${JSON.stringify(redact(output), null, 2)}\n`);
