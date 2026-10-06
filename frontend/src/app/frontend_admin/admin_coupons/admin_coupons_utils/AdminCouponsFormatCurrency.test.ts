import { describe, expect, it } from 'vitest';
import { AdminCouponsFormatCurrency } from '@/app/frontend_admin/admin_coupons/admin_coupons_utils/AdminCouponsFormatCurrency';

describe('AdminCouponsFormatCurrency', () => {
  it('formats coupon amounts from minor units in INR', () => {
    expect(AdminCouponsFormatCurrency(2500, 'en-IN')).toBe('₹25.00');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminCouponsFormatCurrency(Number.NaN, 'en-IN')).toBe('—');
  });
});
