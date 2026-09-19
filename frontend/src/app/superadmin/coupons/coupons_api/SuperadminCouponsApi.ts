import { CouponRecordSchema, RedemptionRecordSchema } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsTypes';
import type { CouponStatus } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsTypes';
// RESPONSIBILITY: Owns the API boundary for Superadmin Coupons and validates every response at the boundary.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Coupon, CouponFormData, RedemptionRecord } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsTypes';
import { CouponsUrlConfig } from '@/app/superadmin/coupons/superadmin_coupons_url_config';
import { z } from 'zod';

export const couponsApi = {
  fetchCoupons: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Coupon[]>>(`${CouponsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(CouponRecordSchema) });
  },
  createCoupon: (body: CouponFormData, idempotencyKey?: string) => apiFetch<ApiResponse<Coupon>>(CouponsUrlConfig.BACKEND_API.BASE, {
    method: 'POST',
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    body: JSON.stringify(body),
    dataSchema: CouponRecordSchema,
  }),
  updateCoupon: (id: string, body: Partial<CouponFormData>, idempotencyKey?: string) => apiFetch<ApiResponse<Coupon>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}`, {
    method: 'PATCH',
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    body: JSON.stringify(body),
    dataSchema: CouponRecordSchema,
  }),
  deleteCoupon: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}`, {
    method: 'DELETE',
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    dataSchema: z.null(),
  }),
  restoreCoupon: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<Coupon>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}/restore`, {
    method: 'POST',
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    dataSchema: CouponRecordSchema,
  }),
  updateCouponStatus: (id: string, status: CouponStatus, idempotencyKey?: string) => apiFetch<ApiResponse<Coupon>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}/status`, {
    method: 'PATCH',
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    body: JSON.stringify({ status }),
    dataSchema: CouponRecordSchema,
  }),
  fetchRedemptions: (id: string) => apiFetch<ApiResponse<RedemptionRecord[]>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}/redemptions`, {
    dataSchema: z.array(RedemptionRecordSchema)
  }),
};
