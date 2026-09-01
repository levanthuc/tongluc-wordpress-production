import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';

const [, , command, pathOrFile, rawBody] = process.argv;
const configPath = '/Applications/XAMPP/xamppfiles/htdocs/web-tongluc/mcp-config.json';
const config = JSON.parse(await readFile(configPath, 'utf8'));
const server = config.mcpServers?.['localhost-global'];
const endpoint = server?.env?.WP_API_URL;
const username = server?.env?.WP_API_USERNAME;
const password = server?.env?.WP_API_PASSWORD;

if (!endpoint || !username || !password) {
  throw new Error('Missing WordPress REST credentials in localhost-global configuration.');
}

const apiRoot = new URL(endpoint).origin + new URL(endpoint).pathname.replace(/\/wp-json\/mcp\/.*$/, '/wp-json');
const authorization = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

async function request(path, init = {}) {
  const response = await fetch(`${apiRoot}${path}`, {
    ...init,
    headers: { authorization, ...(init.headers || {}) },
  });
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return { status: response.status, body };
}

if (command === 'get') {
  const result = await request(pathOrFile);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else if (command === 'get-keys') {
  const result = await request(pathOrFile);
  process.stdout.write(`${JSON.stringify({ status: result.status, keys: result.body && typeof result.body === 'object' ? Object.keys(result.body) : [] }, null, 2)}\n`);
} else if (command === 'post-json') {
  const result = await request(pathOrFile, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(JSON.parse(rawBody || '{}')),
  });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else if (command === 'upload') {
  const filePath = pathOrFile;
  const filename = rawBody || basename(filePath);
  const bytes = await readFile(filePath);
  const result = await request('/wp/v2/media', {
    method: 'POST',
    headers: {
      'content-type': 'image/png',
      'content-disposition': `attachment; filename="${filename.replace(/["\\]/g, '')}"`,
    },
    body: bytes,
  });
  const media = result.body;
  process.stdout.write(`${JSON.stringify({
    status: result.status,
    body: {
      id: media.id,
      slug: media.slug,
      source_url: media.source_url,
      mime_type: media.mime_type,
      media_details: media.media_details,
    },
  }, null, 2)}\n`);
} else if (command === 'ability-read-many') {
  const names = JSON.parse(pathOrFile);
  const results = [];
  for (const name of names) {
    const result = await request(`/wp-abilities/v1/abilities/${name}/run?input=`);
    results.push({ name, status: result.status, body: result.body });
  }
  process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
} else if (command === 'ability-read-inputs') {
  const reads = JSON.parse(pathOrFile);
  const results = [];
  for (const read of reads) {
    const params = new URLSearchParams();
    const append = (value, key) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const [childKey, childValue] of Object.entries(value)) append(childValue, `${key}[${childKey}]`);
      } else if (Array.isArray(value)) {
        value.forEach((childValue, index) => append(childValue, `${key}[${index}]`));
      } else {
        params.append(key, String(value));
      }
    };
    append(read.input || {}, 'input');
    const result = await request(`/wp-abilities/v1/abilities/${read.name}/run?${params.toString()}`);
    results.push({ name: read.name, input: read.input || {}, status: result.status, body: result.body });
  }
  process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
} else if (command === 'ability-schema-summaries') {
  const reads = JSON.parse(pathOrFile);
  const results = [];
  for (const read of reads) {
    const params = new URLSearchParams();
    const append = (value, key) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const [childKey, childValue] of Object.entries(value)) append(childValue, `${key}[${childKey}]`);
      } else if (Array.isArray(value)) {
        value.forEach((childValue, index) => append(childValue, `${key}[${index}]`));
      } else {
        params.append(key, String(value));
      }
    };
    append(read.input || {}, 'input');
    const result = await request(`/wp-abilities/v1/abilities/${read.name}/run?${params.toString()}`);
    const properties = result.body?.schema?.properties || result.body?.schema || {};
    results.push({
      name: read.name,
      input: read.input || {},
      status: result.status,
      properties: Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, {
        type: value?.type,
        description: value?.description,
        default: value?.default,
        enum: value?.enum,
        depends_on: value?.depends_on,
      }])),
    });
  }
  process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
} else if (command === 'ability-write-many') {
  const writes = JSON.parse(pathOrFile);
  const results = [];
  for (const write of writes) {
    const result = await request(`/wp-abilities/v1/abilities/${write.name}/run`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ input: write.input || {} }),
    });
    results.push({ name: write.name, status: result.status, body: result.body });
    if (result.body?.success === false) break;
  }
  process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
} else if (command === 'ability-write-form') {
  const writes = JSON.parse(pathOrFile);
  const results = [];
  const append = (params, value, key) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      for (const [childKey, childValue] of Object.entries(value)) append(params, childValue, `${key}[${childKey}]`);
    } else if (Array.isArray(value)) {
      value.forEach((childValue, index) => append(params, childValue, `${key}[${index}]`));
    } else {
      params.append(key, String(value));
    }
  };
  for (const write of writes) {
    const params = new URLSearchParams();
    append(params, write.input || {}, 'input');
    const result = await request(`/wp-abilities/v1/abilities/${write.name}/run`, {
      method: write.method || 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    results.push({ name: write.name, status: result.status, body: result.body });
    if (result.body?.success === false) break;
  }
  process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
} else if (command === 'builder-build-file') {
  const specs = JSON.parse(await readFile(pathOrFile, 'utf8'));
  const results = [];
  for (const spec of specs) {
    const buildParams = new URLSearchParams();
    buildParams.append('input[post_id]', String(spec.post_id));
    buildParams.append('input[structure]', JSON.stringify(spec.structure));
    const build = await request('/wp-abilities/v1/abilities/uae/builder-build/run', {
      method: 'DELETE',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: buildParams.toString(),
    });
    if (build.body?.success === false) {
      results.push({ post_id: spec.post_id, name: spec.name, build: build.body });
      break;
    }
    const css = await request('/wp-abilities/v1/abilities/uae/builder-regenerate-css/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ input: { post_id: spec.post_id } }),
    });
    results.push({ post_id: spec.post_id, name: spec.name, build: build.body, css: css.body });
  }
  process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
} else if (command === 'builder-build-rest-file') {
  const specs = JSON.parse(await readFile(pathOrFile, 'utf8'));
  const results = [];
  for (const spec of specs) {
    const isFooter = Number(spec.post_id) === 59;
    const endpoint = isFooter ? `/wp/v2/astra-advanced-hook/${spec.post_id}` : `/wp/v2/pages/${spec.post_id}`;
    const templateType = isFooter ? 'wp-post' : 'wp-page';
    const meta = {
      _elementor_edit_mode: 'builder',
      _elementor_template_type: templateType,
      _elementor_data: JSON.stringify(spec.structure),
    };
    if (!isFooter) meta['site-post-title'] = 'disabled';
    const build = await request(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ meta }),
    });
    const css = await request('/wp-abilities/v1/abilities/uae/builder-regenerate-css/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ input: { post_id: spec.post_id } }),
    });
    results.push({
      post_id: spec.post_id,
      name: spec.name,
      build: { status: build.status, id: build.body?.id, modified: build.body?.modified },
      css: css.body,
    });
  }
  process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
} else if (command === 'routes-filter') {
  const pattern = new RegExp(pathOrFile || '.*', 'i');
  const result = await request('/');
  const routes = Object.entries(result.body.routes || {})
    .filter(([route]) => pattern.test(route))
    .map(([route, definition]) => ({
      route,
      namespace: definition.namespace,
      methods: definition.methods,
      endpoints: (definition.endpoints || []).map((endpoint) => ({
        methods: endpoint.methods,
        args: endpoint.args,
      })),
    }));
  process.stdout.write(`${JSON.stringify({ routes }, null, 2)}\n`);
} else {
  throw new Error('Usage: get <REST path> | post-json <REST path> <JSON> | upload <file> [filename] | ability-read-many <JSON names> | ability-read-inputs <JSON reads> | ability-schema-summaries <JSON reads> | ability-write-many <JSON writes> | ability-write-form <JSON writes> | builder-build-file <JSON file> | builder-build-rest-file <JSON file> | routes-filter <regex>');
}
