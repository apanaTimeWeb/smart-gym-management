import { z } from 'zod';
import { RedemptionRecordSchema, CouponRecordSchema, CouponSchema } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_schemas/SuperadminCouponsContractSchemas';
import { toSuperadminCouponsMinorUnits } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDiscountValueUtils';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCouponsApi owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_url_config, zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the API boundary for Superadmin Coupons and validates every response at the boundary.
import { SUPERADMIN_COUPONS_API } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_url_config';

import type { CouponStatus, Coupon, CouponFormData, RedemptionRecord } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';
import type { ApiResponse } from '@/lib/api';



export const couponsApi = {
  fetchCoupons: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Coupon[]>>(`${SUPERADMIN_COUPONS_API.BASE}${q}`, { dataSchema: z.array(CouponRecordSchema) });
  },
  createCoupon: (body: CouponFormData, idempotencyKey: string) => {
    const currency = 'INR';
    const payload = {
      ...body,
      currency,
      discountValue: body.discountType === 'EXACT' ? toSuperadminCouponsMinorUnits(body.discountValue, currency) : body.discountValue,
    };
    return apiFetch<ApiResponse<Coupon>>(SUPERADMIN_COUPONS_API.BASE, {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(payload),
      dataSchema: CouponRecordSchema,
    });
  },
  updateCoupon: (id: string, body: Partial<CouponFormData>, idempotencyKey: string) => {
    const currency = 'INR';
    const payload = {
      ...body,
      ...(body.discountType === 'EXACT' && typeof body.discountValue === 'number'
        ? { discountValue: toSuperadminCouponsMinorUnits(body.discountValue, currency), currency }
        : {}),
    };
    return apiFetch<ApiResponse<Coupon>>(`${SUPERADMIN_COUPONS_API.BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(payload),
      dataSchema: CouponRecordSchema,
    });
  },
  deleteCoupon: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SUPERADMIN_COUPONS_API.BASE}/${id}`, {
    method: 'DELETE',
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: z.null(),
  }),
  restoreCoupon: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<Coupon>>(`${SUPERADMIN_COUPONS_API.BASE}/${id}/restore`, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: CouponRecordSchema,
  }),
  updateCouponStatus: (id: string, status: CouponStatus, idempotencyKey: string) => apiFetch<ApiResponse<Coupon>>(`${SUPERADMIN_COUPONS_API.BASE}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify({ status }),
    dataSchema: CouponRecordSchema,
  }),
  fetchRedemptions: (id: string) => apiFetch<ApiResponse<RedemptionRecord[]>>(`${SUPERADMIN_COUPONS_API.BASE}/${id}/redemptions`, {
    dataSchema: z.array(RedemptionRecordSchema)
  }),
};
