// RESPONSIBILITY: API client for the Coupons module.
import type { ApiResponse, apiFetch } from '@/lib/api';
import type { Coupon } from '@/app/admin/coupons/coupons_types/coupons_types';
import { MOCK_COUPONS } from '@/app/admin/coupons/coupons_utils/AdminCouponsSharedConstants';
import { z } from "zod";
export const couponsApi = {
  fetchCoupons: async () => {
            return apiFetch('/api/admin/coupons/fetchCoupons', { method: 'GET', dataSchema: z.unknown() });
        },
  createCoupon: async (payload: Partial<Coupon>) => {
            return apiFetch('/api/admin/coupons/createCoupon', { method: 'POST', body: JSON.stringify(payload), dataSchema: z.unknown() });
        },
  updateCoupon: async (id: string, payload: Partial<Coupon>) => {
          return apiFetch('/api/admin/coupons/updateCoupon', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  deleteCoupon: async (id: string) => {
          return apiFetch('/api/admin/coupons/deleteCoupon', { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  toggleCoupon: async (id: string) => {
          return apiFetch('/api/admin/coupons/toggleCoupon', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
};
