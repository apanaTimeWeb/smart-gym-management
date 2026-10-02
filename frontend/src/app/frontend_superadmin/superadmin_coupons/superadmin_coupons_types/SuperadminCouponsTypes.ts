/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the Coupons module domain, form, response, and redemption contracts.
import { z } from 'zod';export type CouponStatus = z.infer<typeof CouponStatusSchema>;
import { CouponStatusSchema, RedemptionRecordSchema, CouponRecordSchema, CouponSchema } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_schemas/SuperadminCouponsContractSchemas';
/** KPI filter tabs on the Coupons page — controls which subset of coupons is displayed. */
import type { SUPERADMIN_COUPONS_KPI_TYPES } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
export type CouponKpiFilter = typeof SUPERADMIN_COUPONS_KPI_TYPES[number];export type RedemptionRecord = z.infer<typeof RedemptionRecordSchema>;export type Coupon = z.infer<typeof CouponRecordSchema>;export type CouponFormData = z.infer<typeof CouponSchema>;
