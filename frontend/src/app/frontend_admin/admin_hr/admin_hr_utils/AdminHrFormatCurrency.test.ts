import { describe, expect, it } from 'vitest';
import { AdminHrFormatCurrency } from '@/app/frontend_admin/admin_hr/admin_hr_utils/AdminHrFormatCurrency';

describe('AdminHrFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminHrFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminHrFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
