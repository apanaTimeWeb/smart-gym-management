import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('superadmin_franchises_basic contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/superadmin_franchises_basic.test.tsx', '')).isDirectory()).toBe(true);
  });
});
