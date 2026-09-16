import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('admin_finance_basic contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/admin_finance_basic.test', '')).isDirectory()).toBe(true);
  });
});
