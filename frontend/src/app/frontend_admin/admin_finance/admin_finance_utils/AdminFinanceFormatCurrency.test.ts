import { describe, expect, it } from 'vitest';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatCurrency';

describe('AdminFinanceFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminFinanceFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminFinanceFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
