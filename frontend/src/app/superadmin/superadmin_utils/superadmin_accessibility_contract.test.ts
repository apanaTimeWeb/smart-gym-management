import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

function collectFiles(directory: string): string[] {
  const output: string[] = [];
  for (const entry of readdirSync(directory)) {
    const absolutePath = join(directory, entry);
    if (entry === 'node_modules' || entry === 'e2e') continue;
    if (statSync(absolutePath).isDirectory()) output.push(...collectFiles(absolutePath));
    else if (entry.endsWith('.tsx')) output.push(absolutePath);
  }
  return output;
}

describe('Superadmin accessibility source contract', () => {
  it('requires accessible names, close labels, and focus management on custom dialogs', () => {
    const root = dirname(fileURLToPath(import.meta.url)).replace(/[/\\]superadmin_utils$/, '');
    const violations: string[] = [];
    for (const file of collectFiles(root)) {
      const source = readFileSync(file, 'utf8');
      const dialogs = [...source.matchAll(/role="dialog"[^>]*>/g)];
      if (dialogs.length === 0) continue;
      for (const dialog of dialogs) {
        if (!/aria-label=|aria-labelledby=/.test(dialog[0])) violations.push(`${relative(root, file)}: dialog has no accessible name`);
      }
      for (const button of source.matchAll(/<button\b([^>]*)>[\s\S]{0,240}<X\b[^>]*\/>?[\s\S]{0,120}<\/button>/g)) {
        if (!/aria-label=|title=/.test(button[1])) violations.push(`${relative(root, file)}: X icon button has no accessible label`);
      }
      const modalDialogs = dialogs.filter((dialog) => /aria-modal=\"true\"/.test(dialog[0]));
      if (modalDialogs.length === 1 && !source.includes('useSuperadminDialogAccessibility(')) {
        violations.push(`${relative(root, file)}: single modal dialog has no focus-management hook`);
      }
    }
    expect(violations, violations.join('\n')).toEqual([]);
  });
});
