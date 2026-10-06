import { describe, expect, it } from 'vitest';
import { AdminMembersFormatCurrency } from '@/app/frontend_admin/admin_members/admin_members_utils/AdminMembersFormatCurrency';

describe('AdminMembersFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminMembersFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminMembersFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
