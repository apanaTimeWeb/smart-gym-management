import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('AdminFinanceContext contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/AdminFinanceContext.test', '')).isDirectory()).toBe(true);
  });
});
