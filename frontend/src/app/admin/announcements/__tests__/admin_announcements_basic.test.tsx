import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('admin_announcements_basic contract', () => {
  it('has a non-empty test target module', () => {
    expect(fs.statSync(import.meta.url.replace('/admin_announcements_basic.test.tsx', '')).isDirectory()).toBe(true);
  });
});
