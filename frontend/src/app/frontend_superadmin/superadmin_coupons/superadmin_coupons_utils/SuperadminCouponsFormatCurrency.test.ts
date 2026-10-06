import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsFormatCurrency';



describe('SuperadminCouponsFormatCurrency', () => {
  it('formats coupon monetary values from minor units', () => {
    expect(formatCurrency(1000, 'INR', 'en-IN')).toContain('10.00');
  });
});
