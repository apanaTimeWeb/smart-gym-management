import { describe, expect, it } from 'vitest';
import { AdminPayoutsFormatCurrency } from '@/app/frontend_admin/admin_payouts/admin_payouts_utils/AdminPayoutsFormatCurrency';

describe('AdminPayoutsFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminPayoutsFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminPayoutsFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
