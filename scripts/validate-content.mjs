import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const schemaPath = path.join(rootDir, 'content.schema.json');
const contentPath = path.join(rootDir, 'src', '_data', 'site.json');
const exampleContentPath = path.join(rootDir, 'examples', 'content.json');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function validateFile(filePath, isRequired = true) {
  if (!fs.existsSync(filePath)) {
    if (isRequired) {
      console.error(`Error: Content file not found at ${filePath}`);
      process.exit(1);
    }
    return;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const valid = validate(content);

  if (!valid) {
    console.error(`Validation failed for ${filePath}:`);
    console.error(validate.errors);
    process.exit(1);
  }

  // Check for logical inconsistencies between showOn and hideOn
  if (Array.isArray(content.links)) {
    for (const item of content.links) {
      if (item.showOn && item.hideOn) {
        const overlap = item.showOn.filter(s => item.hideOn.includes(s));
        if (overlap.length > 0) {
          console.error(`Validation error in item "${item.id}": conflicting surfaces in showOn and hideOn (${overlap.join(', ')})`);
          process.exit(1);
        }
      }
    }
  }

  console.log(`✓ Content validated successfully: ${path.relative(rootDir, filePath)}`);
}

console.log('Validating content against content.schema.json...');
validateFile(schemaPath ? contentPath : null, false);
validateFile(exampleContentPath, false);
console.log('✓ All content schemas valid.');
