// RESPONSIBILITY: Centralized constants, mock data, Zod schema, and shared config for the Coupons module.
import type { Coupon, CouponsKPIData } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';

export const COUPON_TYPE_OPTIONS = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'flat', label: 'Flat Amount ' },
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
