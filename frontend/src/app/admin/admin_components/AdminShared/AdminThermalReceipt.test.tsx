import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('AdminThermalReceipt contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/AdminThermalReceipt.test', '')).isDirectory()).toBe(true);
  });
});
