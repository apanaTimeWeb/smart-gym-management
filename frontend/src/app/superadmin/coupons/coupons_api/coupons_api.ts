// RESPONSIBILITY: Modularized API client for the Coupons module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Coupon } from '@/app/superadmin/coupons/coupons_types/coupons_types';

export const couponsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Coupon[]>>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}${q}`);
  },
  create: (body: Partial<Coupon>) => apiFetch<ApiResponse<Coupon>>(SuperadminUrlConfig.BACKEND_API.COUPONS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: Partial<Coupon>) => apiFetch<ApiResponse<Coupon>>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'DELETE' }),
};
