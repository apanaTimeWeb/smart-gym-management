import { describe, expect, it } from 'vitest';
import { useSuperadminCouponRedemptions } from '@/app/superadmin/saas-billing/coupons/coupons_utils/useSuperadminCouponRedemptions.ts';

describe('useSuperadminCouponRedemptions', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminCouponRedemptions).toBe('function');
  });
});
