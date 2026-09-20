import { describe, expect, it } from 'vitest';
import { useSuperadminCouponsMutation } from '@/app/superadmin/saas-billing/coupons/coupons_utils/useSuperadminCouponsMutation.ts';

describe('useSuperadminCouponsMutation', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminCouponsMutation).toBe('function');
  });
});
