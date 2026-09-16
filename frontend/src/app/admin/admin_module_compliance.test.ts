import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const moduleRoot = path.resolve(__dirname);

function sourceFiles(root: string): string[] {
  const output: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) output.push(...sourceFiles(absolute));
    else if (/\.(ts|tsx)$/.test(entry.name)) output.push(absolute);
  }
  return output;
}

describe('admin module architecture contract', () => {
  it('contains no relative imports or TypeScript ignore directives', () => {
    for (const file of sourceFiles(moduleRoot)) {
      const text = fs.readFileSync(file, 'utf8');
      expect(text, file).not.toMatch(/(?:from|import)\s+['"]\./);
      expect(text, file).not.toMatch(/@ts-(?:ignore|nocheck)/);
    }
  });

  it('contains no placeholder boolean tests', () => {
    for (const file of sourceFiles(moduleRoot)) {
      if (!/\.test\.tsx?$/.test(file)) continue;
      const text = fs.readFileSync(file, 'utf8');
      expect(text, file).not.toMatch(/expect\(\s*(?:true|false|1)\s*\)\.to/);
    }
  });

  it('keeps TypeScript components within the documented 300-line ceiling', () => {
    for (const file of sourceFiles(moduleRoot)) {
      if (!file.endsWith('.tsx') || /\.test\.tsx?$/.test(file)) continue;
      const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).length;
      expect(lines, file).toBeLessThanOrEqual(300);
    }
  });
});
