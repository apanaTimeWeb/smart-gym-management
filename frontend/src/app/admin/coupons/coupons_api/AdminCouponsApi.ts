// RESPONSIBILITY: Owns typed HTTP access for Admin coupon queries and mutations.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminCouponsUrlConfig } from '@/app/admin/coupons/admin_coupons_url_config';
import type { AdminCouponsQueryParams, Coupon, CouponFormValues, CouponsKPIData } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';
import { couponSchema } from '@/app/admin/coupons/coupons_types/AdminCouponsSchemas';

function buildQuery(params?: AdminCouponsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const couponsApi = {
  fetchCoupons: async (params?: AdminCouponsQueryParams) => apiFetch<ApiResponse<Coupon[]>>(`${AdminCouponsUrlConfig.api.base}/fetchCoupons${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(couponSchema) }),
  createCoupon: async (payload: Partial<Coupon>) => apiFetch<ApiResponse<Coupon>>(`${AdminCouponsUrlConfig.api.base}/createCoupon`, { method: 'POST', body: JSON.stringify(payload), dataSchema: couponSchema }),
  updateCoupon: async (id: string, payload: Partial<Coupon>) => apiFetch<ApiResponse<Coupon>>(`${AdminCouponsUrlConfig.api.base}/updateCoupon`, { method: 'POST', body: JSON.stringify({ id, ...payload }), dataSchema: couponSchema }),
  deleteCoupon: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminCouponsUrlConfig.api.base}/deleteCoupon`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  toggleCoupon: async (id: string) => apiFetch<ApiResponse<Coupon>>(`${AdminCouponsUrlConfig.api.base}/toggleCoupon`, { method: 'POST', body: JSON.stringify({ id }), dataSchema: couponSchema }),
};

export type { CouponsKPIData };
