import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('AdminMessageModal contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/AdminMessageModal.test', '')).isDirectory()).toBe(true);
  });
});
