import { describe, expect, it } from 'vitest';
import type { AdminUrlQueryBinding } from '@/app/admin/admin_utils/useAdminUrlQuerySync';

describe('AdminUrlQueryBinding contract', () => {
  it('represents only serializable URL primitives and optional defaults', () => {
    const binding: AdminUrlQueryBinding = { key: 'page', value: 2, defaultValue: 1, setValue: (value) => { if (value === '') throw new Error('unexpected empty page'); } };
    expect(binding.key).toBe('page');
    expect(binding.value).toBe(2);
    expect(binding.defaultValue).toBe(1);
  });
});
