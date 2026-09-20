import { describe, expect, it } from 'vitest';
import { getAdminCouponsMockState, resetAdminCouponsMockState } from '@/app/admin/coupons/coupons_mocks/fixtures/AdminCouponsMockState';
import { MOCK_COUPONS_EXPANDED } from '@/app/admin/coupons/coupons_mocks/fixtures/AdminCouponsMockFixtures';

describe('Admin coupons mock state', () => {
  it('starts from a cloned seed and can be reset deterministically', () => {
    resetAdminCouponsMockState();
    const state = getAdminCouponsMockState();
    expect(state).toHaveLength(MOCK_COUPONS_EXPANDED.length);
    state.splice(0, 1);
    expect(getAdminCouponsMockState()).toHaveLength(MOCK_COUPONS_EXPANDED.length - 1);
    resetAdminCouponsMockState();
    expect(getAdminCouponsMockState()).toHaveLength(MOCK_COUPONS_EXPANDED.length);
  });
});
