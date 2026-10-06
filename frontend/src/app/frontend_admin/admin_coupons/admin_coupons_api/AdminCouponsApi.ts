// RESPONSIBILITY: Owns typed HTTP access for Admin coupon queries and mutations.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_COUPONS_API } from '@/app/frontend_admin/admin_coupons/admin_coupons_url_config';
import type { AdminCouponsQueryParams, Coupon, CouponFormValues, CouponsKPIData } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsTypes';
import { couponSchema, couponsKpiDataSchema } from '@/app/frontend_admin/admin_coupons/admin_coupons_schemas/AdminCouponsSchemas';

/** Builds stable query parameters for the coupon list contract. */
function buildQuery(params?: AdminCouponsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const AdminCouponsApi = {
  fetchCoupons: async (params?: AdminCouponsQueryParams) => apiFetch<ApiResponse<Coupon[]>>(`${ADMIN_COUPONS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(couponSchema) }),
  fetchKPIs: async () => apiFetch<ApiResponse<CouponsKPIData>>(ADMIN_COUPONS_API.kpis, { method: 'GET', dataSchema: couponsKpiDataSchema }),
  createCoupon: async (payload: CouponFormValues, idempotencyKey: string) => apiFetch<ApiResponse<Coupon>>(ADMIN_COUPONS_API.base, { method: 'POST', body: JSON.stringify(payload), dataSchema: couponSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  updateCoupon: async (id: string, payload: Partial<Coupon>, idempotencyKey: string) => apiFetch<ApiResponse<Coupon>>(ADMIN_COUPONS_API.detail(id), { method: 'PATCH', body: JSON.stringify(payload), dataSchema: couponSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  deleteCoupon: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_COUPONS_API.detail(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  toggleCoupon: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<Coupon>>(ADMIN_COUPONS_API.toggle(id), { method: 'PATCH', dataSchema: couponSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
};
