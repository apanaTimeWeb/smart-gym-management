// RESPONSIBILITY: Centralized constants, mock data, Zod schema, and shared config for the Coupons module.
import { z } from 'zod';
import type { Coupon, CouponsKPIData } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';

export const COUPON_TYPE_OPTIONS = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'flat', label: 'Flat Amount (₹)' },
];

export const COUPON_STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'expired', label: 'Expired' },
];

export const GYM_OPTIONS = [
  { value: 'all', label: 'All Gyms' },
  { value: 'b1', label: 'Andheri East' },
  { value: 'b2', label: 'Bandra West' },
  { value: 'b3', label: 'Powai' },
  { value: 'b4', label: 'Thane' },
];

export const COUPONS_ITEMS_PER_PAGE = 10;


export const CouponSchema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters').max(20, 'Code too long').toUpperCase(),
  description: z.string().min(5, 'Description required'),
  type: z.enum(['percentage', 'flat']),
  value: z.string().refine(v => !isNaN(Number(v)) && Number(v) > 0, 'Must be a positive number'),
  minOrderAmount: z.string().refine(v => !isNaN(Number(v)) && Number(v) >= 0, 'Must be 0 or more'),
  maxDiscount: z.string().refine(v => !isNaN(Number(v)) && Number(v) >= 0, 'Must be 0 or more'),
  usageLimit: z.string().refine(v => !isNaN(Number(v)) && Number(v) > 0, 'Must be at least 1'),
  assignedGyms: z.array(z.string()).min(1, 'Assign to at least one gym'),
  validFrom: z.string().min(1, 'Start date required'),
  validUntil: z.string().min(1, 'End date required'),
});

export const EMPTY_COUPON_FORM = {
  code: '',
  description: '',
  type: 'percentage' as const,
  value: '',
  minOrderAmount: '0',
  maxDiscount: '0',
  usageLimit: '100',
  assignedGyms: ['all'],
  validFrom: '',
  validUntil: '',
};



export { MOCK_COUPONS, MOCK_COUPONS_KPI } from '@/app/admin/admin_mocks/fixtures/AdminMockFixtures';
