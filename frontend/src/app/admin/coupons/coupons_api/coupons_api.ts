// RESPONSIBILITY: API client for the Coupons module.
import { AdminCouponsUrlConfig } from '@/app/admin/coupons/admin_coupons_url_config';
import type { ApiResponse, apiFetch } from '@/lib/api';
import type { Coupon } from '@/app/admin/coupons/coupons_types/coupons_types';
import { MOCK_COUPONS } from '@/app/admin/coupons/coupons_utils/AdminCouponsSharedConstants';
import { z } from "zod";
export const couponsApi = {
  fetchCoupons: async () => {
            return apiFetch(`${AdminCouponsUrlConfig.BACKEND_API.BASE}/fetchCoupons`, { method: 'GET', dataSchema: z.any() });
        },
  createCoupon: async (payload: Partial<Coupon>) => {
            return apiFetch(`${AdminCouponsUrlConfig.BACKEND_API.BASE}/createCoupon`, { method: 'POST', body: JSON.stringify(payload), dataSchema: z.any() });
        },
  updateCoupon: async (id: string, payload: Partial<Coupon>) => {
          return apiFetch(`${AdminCouponsUrlConfig.BACKEND_API.BASE}/updateCoupon`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
  deleteCoupon: async (id: string) => {
          return apiFetch(`${AdminCouponsUrlConfig.BACKEND_API.BASE}/deleteCoupon`, { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.any() });
      },
  toggleCoupon: async (id: string) => {
          return apiFetch(`${AdminCouponsUrlConfig.BACKEND_API.BASE}/toggleCoupon`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
};
