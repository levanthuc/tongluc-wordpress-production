import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdtemp, readFile } from 'node:fs/promises';
import { connect } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const targets = [
  { name: 'home', url: 'http://localhost/web-tongluc/' },
  { name: 'about', url: 'http://localhost/web-tongluc/gioi-thieu/' },
  { name: 'contact', url: 'http://localhost/web-tongluc/lien-he/' },
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForFile(path, attempts = 100) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      return await readFile(path, 'utf8');
    } catch {
      await delay(100);
    }
  }
  throw new Error(`Timed out waiting for ${path}`);
}

async function evaluate(socketUrl, expression, viewport) {
  const parsed = new URL(socketUrl);
  const socket = connect({ host: parsed.hostname, port: Number(parsed.port) });
  const key = randomBytes(16).toString('base64');
  const request = [
    `GET ${parsed.pathname}${parsed.search} HTTP/1.1`,
    `Host: ${parsed.host}`,
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Key: ${key}`,
    'Sec-WebSocket-Version: 13',
    '',
    '',
  ].join('\r\n');

  let buffer = Buffer.alloc(0);
  let upgraded = false;
  const metricsId = 1;
  const evaluateId = 2;
  const result = await new Promise((resolve, reject) => {
    const send = (payload) => {
      const body = Buffer.from(payload);
      const mask = randomBytes(4);
      let header;
      if (body.length < 126) {
        header = Buffer.from([0x81, 0x80 | body.length]);
      } else if (body.length < 65536) {
        header = Buffer.alloc(4);
        header[0] = 0x81;
        header[1] = 0x80 | 126;
        header.writeUInt16BE(body.length, 2);
      } else {
        header = Buffer.alloc(10);
        header[0] = 0x81;
        header[1] = 0x80 | 127;
        header.writeBigUInt64BE(BigInt(body.length), 2);
      }
      const masked = Buffer.alloc(body.length);
      for (let index = 0; index < body.length; index += 1) masked[index] = body[index] ^ mask[index % 4];
      socket.write(Buffer.concat([header, mask, masked]));
    };

    const parseFrames = () => {
      while (buffer.length >= 2) {
        const second = buffer[1];
        let length = second & 0x7f;
        let offset = 2;
        if (length === 126) {
          if (buffer.length < 4) return;
          length = buffer.readUInt16BE(2);
          offset = 4;
        } else if (length === 127) {
          if (buffer.length < 10) return;
          length = Number(buffer.readBigUInt64BE(2));
          offset = 10;
        }
        if (buffer.length < offset + length) return;
        const opcode = buffer[0] & 0x0f;
        const payload = buffer.subarray(offset, offset + length);
        buffer = buffer.subarray(offset + length);
        if (opcode === 0x1) {
          const message = JSON.parse(payload.toString('utf8'));
          if (message.id === metricsId) {
            send(JSON.stringify({
              id: evaluateId,
              method: 'Runtime.evaluate',
              params: { expression, returnByValue: true, awaitPromise: true },
            }));
          } else if (message.id === evaluateId) {
            resolve(message);
          }
        }
      }
    };

    socket.once('connect', () => socket.write(request));
    socket.on('error', reject);
    socket.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!upgraded) {
        const boundary = buffer.indexOf('\r\n\r\n');
        if (boundary === -1) return;
        const headers = buffer.subarray(0, boundary).toString('utf8');
        if (!headers.startsWith('HTTP/1.1 101')) {
          reject(new Error(`WebSocket upgrade failed: ${headers.split('\r\n')[0]}`));
          return;
        }
        upgraded = true;
        buffer = buffer.subarray(boundary + 4);
        send(JSON.stringify({
          id: metricsId,
          method: 'Emulation.setDeviceMetricsOverride',
          params: {
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: 1,
            mobile: false,
          },
        }));
      }
      parseFrames();
    });
  });
  socket.end();
  if (result.result?.exceptionDetails) {
    return { cdpException: result.result.exceptionDetails.text };
  }
  return result.result?.result?.value || { cdpError: 'Runtime.evaluate returned no value.' };
}

const expression = `(async () => {
  for (let index = 0; index < 100 && (!document.body || document.readyState !== 'complete'); index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!document.body) throw new Error('Document body is unavailable.');
  const overflows = [...document.querySelectorAll('body *')]
    .map((node) => ({ node, rect: node.getBoundingClientRect() }))
    .filter(({ rect }) => rect.right > innerWidth + 1 || rect.left < -1)
    .slice(0, 12)
    .map(({ node, rect }) => ({
      tag: node.tagName,
      id: node.id,
      className: String(node.className || '').slice(0, 140),
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
    }));
  const h1s = [...document.querySelectorAll('h1')].filter((node) => {
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden';
  });
  const headerNodes = [...document.querySelectorAll('#masthead, header, .ast-primary-header-bar, .ast-builder-grid-row-container, .site-header-primary-section-left')];
  const headerBackgrounds = headerNodes.map((node) => ({
    tag: node.tagName,
    className: String(node.className || '').slice(0, 120),
    backgroundColor: getComputedStyle(node).backgroundColor,
  }));
  const customFooter = document.querySelector('[data-elementor-id="59"]');
  const footerText = (customFooter?.innerText || '').replace(/\\s+/g, ' ').trim();
  return {
    url: location.href,
    title: document.title,
    viewport: { width: innerWidth, height: innerHeight },
    document: {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    },
    h1Count: h1s.length,
    h1Text: h1s.map((node) => (node.innerText || '').replace(/\\s+/g, ' ').trim()),
    elementorRootCount: document.querySelectorAll('.elementor').length,
    footer: {
      found: Boolean(customFooter) && footerText.includes('Tổng Lực'),
      copyrightFound: footerText.includes('2026') && footerText.includes('Tổng Lực'),
      textSample: footerText.slice(0, 300),
    },
    contactFormCount: document.querySelectorAll('form.wpcf7-form').length,
    shortcodeLeak: document.body.innerText.includes('[contact-form-7'),
    headerBackgrounds,
    overflows,
  };
})()`;

const output = [];
for (const target of targets) for (const viewport of viewports) {
  const profile = await mkdtemp(join(tmpdir(), `tongluc-cdp-${viewport.name}-`));
  const child = spawn(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    `--window-size=${viewport.width},${viewport.height}`,
    target.url,
  ], { stdio: 'ignore' });

  try {
    const activePort = await waitForFile(join(profile, 'DevToolsActivePort'));
    const port = activePort.trim().split(/\r?\n/)[0];
    let pages = [];
    for (let index = 0; index < 100; index += 1) {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      pages = await response.json();
      if (pages.some((page) => page.type === 'page' && page.url.includes('/web-tongluc/'))) break;
      await delay(100);
    }
    await delay(1200);
    let page;
    for (let index = 0; index < 50; index += 1) {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      pages = await response.json();
      page = pages.find((item) => item.type === 'page' && item.url === target.url);
      if (page) break;
      await delay(100);
    }
    if (!page) throw new Error(`No exact page target for ${target.name}/${viewport.name}`);
    output.push({ page: target.name, viewportName: viewport.name, ...(await evaluate(page.webSocketDebuggerUrl, expression, viewport)) });
  } finally {
    child.kill('SIGTERM');
  }
}

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
