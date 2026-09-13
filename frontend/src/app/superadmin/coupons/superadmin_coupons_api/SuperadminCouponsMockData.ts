import type { Coupon } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';

export const MOCK_SUPERADMIN_COUPONS: Coupon[] = [
  { id: 'c1', code: 'WINTER50', discountType: 'PERCENTAGE', discountValue: 50, maxUses: 100, currentUses: 45, status: 'ACTIVE', expiryDate: '2023-12-31', isDeleted: false },
  { id: 'c2', code: 'NEWYEAR24', discountType: 'EXACT', discountValue: 5000, maxUses: 50, currentUses: 50, status: 'DEPLETED', expiryDate: '2024-01-31', isDeleted: false },
  { id: 'c3', code: 'SUMMER20', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 200, currentUses: 10, status: 'EXPIRED', expiryDate: '2022-08-31', isDeleted: false },
];
