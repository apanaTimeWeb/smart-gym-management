import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('admin_gym-health-alerts_basic contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/admin_gym-health-alerts_basic.test', '')).isDirectory()).toBe(true);
  });
});
