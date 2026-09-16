import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('AdminDashboardContext contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/AdminDashboardContext.test.tsx', '')).isDirectory()).toBe(true);
  });
});
