import { describe, expect, it } from 'vitest';
import { displayValue } from '@/app/admin/admin_utils/displayValue';

describe('displayValue', () => {
  it('uses an en dash for nullish and empty values', () => {
    expect(displayValue(null)).toBe('—');
    expect(displayValue(undefined)).toBe('—');
    expect(displayValue('')).toBe('—');
  });

  it('preserves meaningful values', () => {
    expect(displayValue('Active')).toBe('Active');
    expect(displayValue(0)).toBe('0');
  });
});
