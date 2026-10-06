import { describe, expect, it } from 'vitest';
import { AdminBranchesFormatCurrency } from '@/app/frontend_admin/admin_branches/admin_branches_utils/AdminBranchesFormatCurrency';

describe('AdminBranchesFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminBranchesFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminBranchesFormatCurrency(Number.POSITIVE_INFINITY, 'INR', 'en-IN')).toBe('—');
  });
});
