// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin coupons feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.
import { MOCK_COUPONS_EXPANDED } from '@/app/admin/coupons/coupons_mocks/fixtures/AdminCouponsMockFixtures';
import type { Coupon } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';

function cloneCouponRecords(records: Coupon[]): Coupon[] {
  return records.map((record) => ({
    ...record,
    assignedGyms: [...record.assignedGyms],
    assignedGymNames: [...record.assignedGymNames],
  }));
}

let adminCouponsMockState = cloneCouponRecords(MOCK_COUPONS_EXPANDED);

export function getAdminCouponsMockState(): Coupon[] {
  return adminCouponsMockState;
}

export function resetAdminCouponsMockState(): void {
  adminCouponsMockState = cloneCouponRecords(MOCK_COUPONS_EXPANDED);
}
