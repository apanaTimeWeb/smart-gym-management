// RESPONSIBILITY: Modularized API client for the Coupons module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Coupon } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';

import { MOCK_SUPERADMIN_COUPONS } from '@/app/superadmin/coupons/superadmin_coupons_api/SuperadminCouponsMockData';

let mockCoupons = [...MOCK_SUPERADMIN_COUPONS];

export const couponsApi = {
  fetchCoupons: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockCoupons };
  },
  createCoupon: async (body: Partial<Coupon>) => {
    await new Promise(r => setTimeout(r, 500));
    const newCoupon = { ...body, id: `c${Date.now()}`, currentUses: 0, status: 'ACTIVE', isDeleted: false } as Coupon;
    mockCoupons = [newCoupon, ...mockCoupons];
    return { success: true, message: 'Created', data: newCoupon };
  },
  updateCoupon: async (id: string, body: Partial<Coupon>) => {
    await new Promise(r => setTimeout(r, 500));
    mockCoupons = mockCoupons.map(c => c.id === id ? { ...c, ...body } : c);
    return { success: true, message: 'Updated', data: mockCoupons.find(c => c.id === id) as Coupon };
  },
  deleteCoupon: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockCoupons = mockCoupons.filter(c => c.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
};
