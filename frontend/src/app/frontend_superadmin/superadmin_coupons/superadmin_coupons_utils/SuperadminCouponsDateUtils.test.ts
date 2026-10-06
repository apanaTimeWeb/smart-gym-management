import { describe, expect, it } from 'vitest';

import { formatSuperadminCouponDateForInput } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateUtils';



describe('formatSuperadminCouponDateForInput', () => {
  it('returns yyyy-MM-dd', () => {
    expect(formatSuperadminCouponDateForInput('2026-09-20T12:00:00.000Z')).toBe('2026-09-20');
  });
});
