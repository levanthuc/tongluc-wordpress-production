import { readFile, writeFile } from 'node:fs/promises';

export async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    throw new Error(`Cannot read valid JSON from ${path}: ${error.message}`);
  }
}

export async function readJsonInput(value) {
  if (!value) return {};
  if (value.trim().startsWith('{') || value.trim().startsWith('[')) return JSON.parse(value);
  return readJson(value);
}

export async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function extractToolPayload(result) {
  if (result?.structuredContent !== undefined) return result.structuredContent;
  const text = result?.content?.find((item) => item.type === 'text')?.text;
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

const secretKey = /(password|authorization|secret|token|api[_-]?key|cookie)/i;

export function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, secretKey.test(key) ? '<redacted>' : redact(child)]));
}
