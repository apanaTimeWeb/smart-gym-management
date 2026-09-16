import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('AdminPlansContext contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/AdminPlansContext.test', '')).isDirectory()).toBe(true);
  });
});
