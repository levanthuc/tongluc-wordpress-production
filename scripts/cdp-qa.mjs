#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import WebSocket from 'ws';
import { parseArgs, positiveInteger, requireOption } from './lib/cli.mjs';
import { readJson, writeJson } from './lib/json.mjs';
import { validateAgainstSchema } from './lib/schema.mjs';

const defaultViewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 }
];

async function firstExisting(paths) {
  for (const path of paths) {
    if (!path) continue;
    try { await access(path); return path; } catch { /* continue */ }
  }
  throw new Error('Chrome/Chromium not found. Use --chrome <path> or CHROME_PATH.');
}

function validatePlan(plan) {
  if (plan?.schema_version !== '1.0.0') throw new Error('Unsupported QA plan schema_version.');
  if (!Array.isArray(plan.pages) || plan.pages.length === 0) throw new Error('QA plan requires pages.');
  for (const page of plan.pages) {
    if (!page.name || (!page.url && !page.path)) throw new Error('Each QA page requires name and url/path.');
    if (page.path && !plan.site_url) throw new Error(`Page ${page.name} uses path but site_url is missing.`);
  }
}

const delay = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

async function waitForDebugPort(profilePath, timeoutMs) {
  const activePort = join(profilePath, 'DevToolsActivePort');
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const [port] = (await readFile(activePort, 'utf8')).trim().split(/\r?\n/);
      if (Number(port) > 0) return Number(port);
    } catch { /* not ready */ }
    await delay(50);
  }
  throw new Error('Chrome DevTools port did not become ready.');
}

class CdpClient {
  constructor(url) {
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    this.socket = new WebSocket(url);
    this.socket.on('message', (raw) => {
      const message = JSON.parse(String(raw));
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result || {});
      } else if (message.method) {
        for (const listener of this.listeners.get(message.method) || []) listener(message.params || {});
      }
    });
  }

  async open() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolvePromise, reject) => {
      this.socket.once('open', resolvePromise);
      this.socket.once('error', reject);
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  once(method, timeoutMs) {
    return new Promise((resolvePromise, reject) => {
      const handler = (params) => { clearTimeout(timer); resolvePromise(params); };
      const list = this.listeners.get(method) || [];
      list.push(handler);
      this.listeners.set(method, list);
      const timer = setTimeout(() => {
        const current = this.listeners.get(method) || [];
        this.listeners.set(method, current.filter((item) => item !== handler));
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
    });
  }

  close() {
    this.socket.close();
  }
}

function assertionExpression(assertion) {
  const selector = JSON.stringify(assertion.selector || '');
  const value = JSON.stringify(assertion.value || '');
  switch (assertion.type) {
    case 'selector-exists': return `Boolean(document.querySelector(${selector}))`;
    case 'selector-visible': return `(() => { const e=document.querySelector(${selector}); if(!e)return false; const s=getComputedStyle(e),r=e.getBoundingClientRect(); return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0; })()`;
    case 'text-includes': return `(() => { const e=document.querySelector(${selector}); return Boolean(e && e.textContent.includes(${value})); })()`;
    case 'one-h1': return `document.querySelectorAll('h1').length === 1`;
    case 'no-horizontal-overflow': return `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1`;
    default: throw new Error(`Unknown assertion type: ${assertion.type}`);
  }
}

const { options } = parseArgs(process.argv.slice(2));
const planPath = resolve(requireOption(options, 'plan'));
const plan = await readJson(planPath);
await validateAgainstSchema(plan, resolve(new URL('../assets/schemas/qa-plan.schema.json', import.meta.url).pathname), 'QA plan');
validatePlan(plan);
const timeoutMs = positiveInteger(options.timeout || plan.navigation_timeout_ms, 30000);
const chromePath = await firstExisting([
  options.chrome,
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
]);
const profilePath = await mkdtemp(join(tmpdir(), 'tongluc-cdp-qa-'));
const artifactsDir = options['artifacts-dir'] ? resolve(options['artifacts-dir']) : join(profilePath, 'artifacts');
const keepArtifacts = options['keep-artifacts'] === true;
if (plan.screenshots || keepArtifacts) await mkdir(artifactsDir, { recursive: true });

const chrome = spawn(chromePath, [
  '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--disable-background-networking',
  '--remote-debugging-port=0', `--user-data-dir=${profilePath}`, 'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });
let chromeError = '';
chrome.stderr.on('data', (chunk) => { chromeError += String(chunk); });

const report = { plan: planPath, started_at: new Date().toISOString(), viewports: plan.viewports || defaultViewports, results: [] };

try {
  const port = await waitForDebugPort(profilePath, timeoutMs);
  for (const page of plan.pages) {
    const pageUrl = page.url || new URL(page.path, plan.site_url).toString();
    for (const viewport of report.viewports) {
      const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' });
      if (!targetResponse.ok) throw new Error(`Cannot create CDP target: HTTP ${targetResponse.status}`);
      const target = await targetResponse.json();
      const cdp = new CdpClient(target.webSocketDebuggerUrl);
      await cdp.open();
      const item = { page: page.name, url: pageUrl, viewport, assertions: [] };
      report.results.push(item);
      try {
        await cdp.send('Page.enable');
        await cdp.send('Runtime.enable');
        await cdp.send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.width < 600 });
        const loaded = cdp.once('Page.loadEventFired', timeoutMs);
        await cdp.send('Page.navigate', { url: pageUrl });
        await loaded;
        await delay(250);
        const assertions = page.assertions?.length ? page.assertions : [{ type: 'one-h1' }, { type: 'no-horizontal-overflow' }];
        for (const assertion of assertions) {
          const evaluation = await cdp.send('Runtime.evaluate', { expression: assertionExpression(assertion), returnByValue: true });
          item.assertions.push({ ...assertion, passed: evaluation.result?.value === true });
        }
        item.passed = item.assertions.every((assertion) => assertion.passed);
        if (plan.screenshots || keepArtifacts) {
          const screenshot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
          const safeName = `${page.name}-${viewport.name}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
          const screenshotPath = join(artifactsDir, `${safeName}.png`);
          await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
          item.screenshot = screenshotPath;
        }
      } finally {
        cdp.close();
        await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`).catch(() => undefined);
      }
    }
  }
  report.status = report.results.every((item) => item.passed) ? 'passed' : 'failed';
  if (report.status === 'failed') process.exitCode = 1;
} catch (error) {
  report.status = 'error';
  report.error = error.message;
  if (chromeError) report.chrome_error = chromeError.slice(-2000);
  process.exitCode = 1;
} finally {
  report.finished_at = new Date().toISOString();
  chrome.kill('SIGTERM');
  await Promise.race([new Promise((resolvePromise) => chrome.once('exit', resolvePromise)), delay(2000)]);
  if (chrome.exitCode === null) chrome.kill('SIGKILL');
  if (!keepArtifacts) await rm(profilePath, { recursive: true, force: true });
  else report.artifacts_dir = artifactsDir;
}

if (options.output) await writeJson(resolve(options.output), report);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
