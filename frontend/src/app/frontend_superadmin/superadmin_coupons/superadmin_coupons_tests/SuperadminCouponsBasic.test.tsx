import {describe, expect, it, beforeEach} from 'vitest';

import { MOCK_SUPERADMIN_COUPONS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_fixtures/SuperadminCouponsMockFixtures';
import { resetSuperadminCouponsMockState } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_handlers/SuperadminCouponsMockHandlers';



beforeEach(() => {
  resetSuperadminCouponsMockState();
});

describe('Superadmin Coupons module fixture contract', () => {
  it('provides valid coupon records required by the list and status UI', () => {
    expect(Array.isArray(MOCK_SUPERADMIN_COUPONS)).toBe(true);
    expect(MOCK_SUPERADMIN_COUPONS.length).toBeGreaterThan(0);
    expect(MOCK_SUPERADMIN_COUPONS.every((coupon) => Boolean(coupon.id && coupon.code && coupon.status))).toBe(true);
    expect(new Set(MOCK_SUPERADMIN_COUPONS.map((coupon) => coupon.status)).size).toBeGreaterThan(1);
  });

});
