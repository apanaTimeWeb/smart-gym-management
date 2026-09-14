// RESPONSIBILITY: API client for the Coupons module.
import { AdminCouponsUrlConfig } from '@/app/admin/coupons/admin_coupons_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Coupon } from '@/app/admin/coupons/coupons_types/coupons_types';
import { MOCK_COUPONS } from '@/app/admin/coupons/coupons_utils/AdminCouponsSharedConstants';
import { z } from "zod";

export const couponsApi = {
  fetchCoupons: async () => {
    return apiFetch<ApiResponse<any>>(`${AdminCouponsUrlConfig.api.base}/fetchCoupons`, { method: 'GET', dataSchema: z.any() });
  },
  createCoupon: async (payload: Partial<Coupon>) => {
    return apiFetch<ApiResponse<any>>(`${AdminCouponsUrlConfig.api.base}/createCoupon`, { method: 'POST', body: JSON.stringify(payload), dataSchema: z.any() });
  },
  updateCoupon: async (id: string, payload: Partial<Coupon>) => {
    return apiFetch<ApiResponse<any>>(`${AdminCouponsUrlConfig.api.base}/updateCoupon`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
  },
  deleteCoupon: async (id: string) => {
    return apiFetch<ApiResponse<any>>(`${AdminCouponsUrlConfig.api.base}/deleteCoupon`, { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.any() });
  },
  toggleCoupon: async (id: string) => {
    return apiFetch<ApiResponse<any>>(`${AdminCouponsUrlConfig.api.base}/toggleCoupon`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
  },
};
