import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    if (entry.isFile() && target.endsWith('.ts')) files.push(target);
  }
  return files;
}

const files = await walk(root);
const violations = [];

for (const file of files) {
  const rel = relative(root, file).replaceAll('\\', '/');
  const moduleMatch = rel.match(/^modules\/([^/]+)\//);
  if (!moduleMatch) continue;
  const owner = moduleMatch[1];
  const content = await readFile(file, 'utf8');
  const importPattern = /from\s+['"]@\/modules\/([^/]+)\//g;
  for (const match of content.matchAll(importPattern)) {
    if (match[1] !== owner) {
      violations.push(`${rel} imports sibling business module ${match[1]}`);
    }
  }
}

if (violations.length) {
  process.stderr.write(`${violations.join('\n')}\n`);
  process.exit(1);
}

process.stdout.write('Module isolation check passed.\n');
