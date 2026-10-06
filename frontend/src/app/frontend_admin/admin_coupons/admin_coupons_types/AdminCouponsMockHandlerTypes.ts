// RESPONSIBILITY: Owns mock-handler input/output types for the Admin coupons feature.
import type { Coupon } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsTypes';

export type AdminCouponsJsonObject = Record<string, unknown>;
export type CouponRecord = Coupon;
