import { describe, expect, it } from 'vitest';
import { AdminReportsFormatCurrency } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatCurrency';

describe('AdminReportsFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminReportsFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminReportsFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
