import { describe, expect, it } from 'vitest';
import { maskSensitiveData } from '@/app/admin/admin_utils/AdminMaskSensitiveData';

describe('maskSensitiveData', () => {
  it('masks a standard phone number while retaining safe portions', () => {
    expect(maskSensitiveData('9876543210')).toBe('98****3210');
  });

  it('normalizes formatted phone numbers before masking', () => {
    expect(maskSensitiveData('+91 98765 43210')).toBe('91****3210');
  });

  it('uses the canonical empty fallback', () => {
    expect(maskSensitiveData(null)).toBe('—');
    expect(maskSensitiveData('')).toBe('—');
  });
});
