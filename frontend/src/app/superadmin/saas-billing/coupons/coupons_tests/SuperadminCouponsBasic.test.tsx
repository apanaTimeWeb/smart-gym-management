import { resetSuperadminCouponsMockState } from '@/app/superadmin/saas-billing/coupons/coupons_mocks/handlers/SuperadminCouponsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_COUPONS } from '@/app/superadmin/saas-billing/coupons/coupons_mocks/fixtures/SuperadminCouponsMockFixtures';

beforeEach(() => {
  resetSuperadminCouponsMockState();
});

describe('Superadmin Coupons module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_COUPONS).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_COUPONS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
