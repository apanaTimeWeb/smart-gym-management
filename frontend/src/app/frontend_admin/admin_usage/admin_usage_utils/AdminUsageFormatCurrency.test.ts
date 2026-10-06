import { describe, expect, it } from 'vitest';
import { AdminUsageFormatCurrency } from '@/app/frontend_admin/admin_usage/admin_usage_utils/AdminUsageFormatCurrency';

describe('AdminUsageFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminUsageFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminUsageFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
