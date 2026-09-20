import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const moduleRoot = path.resolve(__dirname);
const featureModules = new Set(['announcements','attendance','audit_logs','blacklist','branches','campaigns','coupons','dashboard','data-export','finance','gym-health-alerts','hr','members','notifications','payouts','permissions','plans','profile','reports','sales','settings','subscriptions','usage']);

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

  it('blocks cross-feature Admin business imports while allowing the documented shell boundary', () => {
    for (const file of sourceFiles(moduleRoot)) {
      const relative = path.relative(moduleRoot, file).replaceAll('\\','/');
      const owner = relative.split('/')[0];
      if (!featureModules.has(owner) || relative.startsWith('admin_components/')) continue;
      const text = fs.readFileSync(file, 'utf8');
      for (const target of featureModules) {
        if (target === owner) continue;
        expect(text, `${file} imports ${target}`).not.toMatch(new RegExp(`@/app/admin/${target}/`));
      }
    }
  });

  it('requires module-owned mock fixtures and handlers for every feature module', () => {
    for (const feature of featureModules) {
      const base = path.join(moduleRoot, feature, `${feature}_mocks`);
      expect(fs.existsSync(path.join(base, 'fixtures')), feature).toBe(true);
      expect(fs.existsSync(path.join(base, 'handlers')), feature).toBe(true);
      const fixtures = fs.readdirSync(path.join(base, 'fixtures')).filter((name) => /\.(ts|tsx)$/.test(name));
      const handlers = fs.readdirSync(path.join(base, 'handlers')).filter((name) => /\.(ts|tsx)$/.test(name));
      expect(fixtures.length, `${feature} fixtures`).toBeGreaterThan(0);
      expect(handlers.length, `${feature} handlers`).toBeGreaterThan(0);
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

  it('rejects production any, raw theme values, and semantic background opacity modifiers', () => {
    for (const file of sourceFiles(moduleRoot)) {
      if (/\.test\.tsx?$/.test(file)) continue;
      const content = fs.readFileSync(file, 'utf8');
      expect(content, file).not.toMatch(/(?:\bany\b\s*(?:[;,)|]|=>)|:\s*any\b|as\s+any\b|<any\b|Array<any\b|Promise<any\b|Record<[^>]*,\s*any\b)/);
      if (file.endsWith('.tsx')) {
        expect(content, file).not.toMatch(/bg-[-\w]+\/(?:5|10|20|30|40|50|60|70|80|90|95)/);
        expect(content, file).not.toMatch(/(?:bg|text|border|ring)-\[(?:var\(--|#)/);
      }
    }
  });

  it('requires every feature to expose canonical feature documentation', () => {
    for (const feature of featureModules) {
      expect(fs.existsSync(path.join(moduleRoot, feature, `${feature}_features.md`)), `${feature} feature map`).toBe(true);
      expect(fs.existsSync(path.join(moduleRoot, feature, `${feature}_forbidden.md`)), `${feature} forbidden map`).toBe(true);
      expect(fs.existsSync(path.join(moduleRoot, feature, `${feature}_theme_contract.md`)), `${feature} theme contract`).toBe(true);
    }
  });

});
