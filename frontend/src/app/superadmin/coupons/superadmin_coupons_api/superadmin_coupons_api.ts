import { CouponSchema } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';
// RESPONSIBILITY: Modularized API client for the Coupons module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Coupon } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';
import { CouponsUrlConfig } from '@/app/superadmin/coupons/coupons_url_config';
import { z } from "zod";

export const couponsApi = {
  fetchCoupons: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Coupon[]>>(`${CouponsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(CouponSchema) });
  },
  createCoupon: (body: Partial<Coupon>) =>
    apiFetch<ApiResponse<Coupon>>(CouponsUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: CouponSchema
    }),

  updateCoupon: (id: string, body: Partial<Coupon>) =>
    apiFetch<ApiResponse<Coupon>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: CouponSchema
    }),
  deleteCoupon: (id: string) =>
    apiFetch<ApiResponse<void>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'DELETE',
        dataSchema: z.null()
    }),
  restoreCoupon: (id: string) =>
    apiFetch<ApiResponse<Coupon>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}/restore`, {
      method: 'POST',
      dataSchema: CouponSchema
    }),
  toggleStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') =>
    apiFetch<ApiResponse<Coupon>>(`${CouponsUrlConfig.BACKEND_API.BASE}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      dataSchema: CouponSchema
    }),
};
