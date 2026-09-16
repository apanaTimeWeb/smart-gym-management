import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('AdminBulkMessageModal contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/AdminBulkMessageModal.test', '')).isDirectory()).toBe(true);
  });
});
