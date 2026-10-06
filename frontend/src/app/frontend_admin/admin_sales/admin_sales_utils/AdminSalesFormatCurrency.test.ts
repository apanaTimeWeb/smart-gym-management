import { describe, expect, it } from 'vitest';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatCurrency';

describe('AdminSalesFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminSalesFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminSalesFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
