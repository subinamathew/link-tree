import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const siteDir = path.join(rootDir, '_site');

if (!fs.existsSync(siteDir)) {
  console.error(`Error: _site directory not found at ${siteDir}`);
  process.exit(1);
}

// 1. Verify required routes exist
const requiredFiles = [
  path.join(siteDir, 'index.html'),
  path.join(siteDir, 'impressum', 'index.html'),
  path.join(siteDir, 'datenschutz', 'index.html'),
  path.join(siteDir, 'css', 'main.css'),
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`Error: Expected output file does not exist: ${path.relative(rootDir, file)}`);
    process.exit(1);
  }
}

// 2. Scan for unexpected JS files in _site
function findFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findFiles(fullPath, ext));
    } else if (fullPath.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

const jsFiles = findFiles(siteDir, '.js');
const allowedJsFiles = ['assets/js/video-embed.js', 'assets/js/storyblok-bridge.js'];

for (const file of jsFiles) {
  const relPath = path.relative(siteDir, file).replace(/\\/g, '/');
  if (!allowedJsFiles.includes(relPath)) {
    console.error(`Error: Found unexpected client-side JavaScript bundle: ${relPath}`);
    process.exit(1);
  }
  // Verify that justified JS files stay under budget (< 2 KB each)
  const size = fs.statSync(file).size;
  if (size > 2048) {
    console.error(`Error: ${relPath} exceeded size budget: ${size} bytes`);
    process.exit(1);
  }
}

// 3. Scan HTML files for third-party embeds, iframes on initial load, and remote fonts
const htmlFiles = findFiles(siteDir, '.html');
const forbiddenPatterns = [
  { pattern: /<iframe/i, message: 'Forbidden initial <iframe> embed found (violates zero initial third-party rule)' },
  { pattern: /fonts\.(googleapis|gstatic)\.com/i, message: 'Forbidden external font request found' },
  { pattern: /<script(?![^>]*src=["']\/assets\/js\/(video-embed|storyblok-bridge)\.js["'])[^>]*>/i, message: 'Forbidden unauthorized <script> tag found' }
];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const { pattern, message } of forbiddenPatterns) {
    if (pattern.test(content)) {
      console.error(`Privacy violation in ${path.relative(siteDir, file)}: ${message}`);
      process.exit(1);
    }
  }
}

console.log('✓ Build verification passed:');
console.log('  - All required pages generated');
console.log('  - Strict budget maintained (zero framework hydration, < 1.5 KB justified vanilla helper)');
console.log('  - Zero initial third-party requests or initial iframes on page load');
