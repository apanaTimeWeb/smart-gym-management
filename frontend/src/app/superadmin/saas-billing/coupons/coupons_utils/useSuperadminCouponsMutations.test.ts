import { describe, expect, it } from 'vitest';
import { useSuperadminCouponsMutations } from '@/app/superadmin/saas-billing/coupons/coupons_utils/useSuperadminCouponsMutations.ts';

describe('useSuperadminCouponsMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminCouponsMutations).toBe('function');
  });
});
