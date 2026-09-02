import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { readJson } from './json.mjs';

export async function validateAgainstSchema(data, schemaPath, label) {
  const schema = await readJson(schemaPath);
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, allowUnionTypes: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    const details = (validate.errors || []).map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ');
    throw new Error(`${label} failed schema validation: ${details}`);
  }
}
