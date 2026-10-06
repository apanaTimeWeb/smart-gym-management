import { describe, expect, it } from 'vitest';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansFormatCurrency';

describe('AdminPlansFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminPlansFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminPlansFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
