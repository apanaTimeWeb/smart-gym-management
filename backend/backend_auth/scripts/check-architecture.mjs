import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'src');
const failures = [];
const tsFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.ts')) tsFiles.push(full);
  }
}
walk(src);

const ceilings = [
  [/\.controller\.ts$/, 200, 'controller'],
  [/\.service\.ts$/, 300, 'service'],
  [/\.repository\.ts$/, 200, 'repository'],
  [/\.(entity|dto)\.ts$/, 150, 'entity/dto'],
  [/\.module\.ts$/, 100, 'module'],
  [/\.(utils|mapper)\.ts$/, 120, 'utility/mapper'],
];

for (const file of tsFiles) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const firstNonEmpty = lines.find((line) => line.trim());
  if ((rel.includes('/controllers/') || /\.(controller|service|repository)\.ts$/.test(rel)) && !/^\/\/ RESPONSIBILITY:/.test(firstNonEmpty ?? '')) {
    failures.push(`${rel}: missing top-of-file RESPONSIBILITY comment`);
  }
  if (/\.(controller|service|repository)\.ts$/.test(rel)) {
    const respIndex = lines.findIndex((line) => /^\/\/ RESPONSIBILITY:/.test(line));
    const flowIndex = lines.findIndex((line) => /^\/\/ FLOW:/.test(line));
    if (respIndex < 0 || flowIndex !== respIndex + 1) failures.push(`${rel}: FLOW comment must immediately follow RESPONSIBILITY`);
  }
  for (const [pattern, max, label] of ceilings) {
    if (pattern.test(rel) && lines.length > max) failures.push(`${rel}: ${lines.length} lines exceeds ${label} ceiling ${max}`);
  }
  if (/(^|\n)import\s+.*from\s+['"]\.\.?\//.test(text)) failures.push(`${rel}: relative import found`);
  if (/(^|\n)import\s+.*from\s+['"](?:.*\/)?index['"]/.test(text)) failures.push(`${rel}: barrel import found`);
  if (/\brequire\s*\(/.test(text)) failures.push(`${rel}: require() found`);
  if (/\bconsole\.(log|error|warn|debug|info)\s*\(/.test(text)) failures.push(`${rel}: raw console logging found`);
  if (/@ts-(ignore|nocheck|expect-error)/.test(text)) failures.push(`${rel}: TypeScript suppression directive found`);
  if (/process\.env\b/.test(text) && !rel.endsWith('core-environment.config.ts') && !rel.endsWith('core-data-source.ts')) failures.push(`${rel}: raw process.env access outside approved config/data-source infrastructure`);
}

for (const name of ['index.ts', 'index.js']) {
  const hits = [];
  function walkAny(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkAny(full);
      else if (entry.name === name) hits.push(full);
    }
  }
  walkAny(src);
  for (const hit of hits) failures.push(`${path.relative(root, hit)}: barrel file forbidden`);
}

const contracts = [
  'src/core/types/api-response.types.ts',
  'src/core/types/pagination.types.ts',
  'src/core/types/validation-error.types.ts',
  'src/core/dtos/pagination-query.dto.ts',
  'src/core/config/rate-limit.config.ts',
  'src/core/config/timeout.config.ts',
  'src/core/config/database.config.ts',
  'src/core/scheduled-jobs.registry.ts',
];
for (const rel of contracts) if (!fs.existsSync(path.join(root, rel))) failures.push(`${rel}: required architectural contract file missing`);

const featureRoot = path.join(src, 'modules', 'auth');
for (const rel of ['auth_backend_feature.md', 'auth_dependencies.md', 'auth_forbidden.md', 'auth.seeder.ts', 'auth_collection.json']) {
  if (!fs.existsSync(path.join(featureRoot, rel))) failures.push(`src/modules/auth/${rel}: required feature artifact missing`);
}

const featureDoc = fs.readFileSync(path.join(featureRoot, 'auth_backend_feature.md'), 'utf8');
if ((featureDoc.match(/TBD/g) ?? []).length) failures.push('auth_backend_feature.md: contains TBD');
if ((featureDoc.match(/^[-*]\s+/gm) ?? []).length < 3) failures.push('auth_backend_feature.md: insufficient concrete documentation entries');
const forbiddenDoc = fs.readFileSync(path.join(featureRoot, 'auth_forbidden.md'), 'utf8');
const numbered = [...forbiddenDoc.matchAll(/^\d+\./gm)];
if (numbered.length < 5) failures.push('auth_forbidden.md: fewer than 5 forbidden patterns');

const roleConstants = fs.readFileSync(path.join(featureRoot, 'auth.roles.constants.ts'), 'utf8');
if (!/export\s+enum\s+AuthRole/.test(roleConstants)) failures.push('auth.roles.constants.ts: AuthRole enum missing');
const statusConstants = fs.readFileSync(path.join(featureRoot, 'auth.status.constants.ts'), 'utf8');
if (!/export\s+enum\s+AuthUserStatus/.test(statusConstants)) failures.push('auth.status.constants.ts: AuthUserStatus enum missing');

const timeout = fs.readFileSync(path.join(src, 'core/config/timeout.config.ts'), 'utf8');
const timeoutExpectations = {
  EXTERNAL_API_DEFAULT_MS: '5_000',
  PAYMENT_GATEWAY_MS: '10_000',
  WHATSAPP_API_MS: '4_000',
  SMS_API_MS: '3_000',
  DB_QUERY_DEFAULT_MS: '3_000',
  DB_QUERY_REPORT_MS: '30_000',
  DB_TRANSACTION_MS: '10_000',
  JOB_STEP_DEFAULT_MS: '30_000',
};
for (const [key, val] of Object.entries(timeoutExpectations)) if (!new RegExp(`${key}\\s*:\\s*${val}`).test(timeout)) failures.push(`timeout.config.ts: ${key} must equal ${val}`);

const pagination = fs.readFileSync(path.join(src, 'core/types/pagination.types.ts'), 'utf8');
for (const key of ['total', 'page', 'limit', 'totalPages', 'hasNextPage', 'hasPrevPage']) if (!new RegExp(`\\b${key}\\b`).test(pagination)) failures.push(`pagination.types.ts: missing ${key}`);


for (const file of tsFiles.filter((f) => f.endsWith('.spec.ts'))) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  const text = fs.readFileSync(file, 'utf8');
  if (/expect\s*\(\s*(?:true|false|1|0)\s*\)/.test(text)) failures.push(`${rel}: trivial self-evident assertion found`);
  if (!/\bexpect\s*\(/.test(text)) failures.push(`${rel}: test file has no observable assertion`);
}

const sourceText = tsFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
if (/status\s*:\s*\b(?:200|201|202|204|400|401|403|404|409|422|429|500|503)\b/.test(sourceText)) failures.push('source: hardcoded HTTP status literal found');
if (/\.save\s*\(/.test(sourceText) && /src\/modules\/auth\/services\//.test(sourceText)) {
  for (const file of tsFiles.filter((f) => f.includes('/services/'))) {
    const text = fs.readFileSync(file, 'utf8');
    if (/\.save\s*\(/.test(text)) failures.push(`${path.relative(root, file)}: service directly invokes save()`);
  }
}

if (failures.length) {
  console.error('Architecture gate FAILED');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Architecture gate passed (${tsFiles.length} TypeScript source files checked).`);
