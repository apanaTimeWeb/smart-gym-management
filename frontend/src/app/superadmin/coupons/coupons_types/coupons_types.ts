// RESPONSIBILITY: Defines all TypeScript types, Zod schemas, and form data shapes for the Coupons module. Single source of truth for coupon data contracts.
import { z } from 'zod';
import type { Coupon, CouponStatus } from '@/app/superadmin/superadmin_types/superadmin_types';

export type { Coupon, CouponStatus };

export const CouponSchema = z.object({
  code: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'EXACT']),
  discountValue: z.number().min(1, 'Discount value must be at least 1'),
  maxUses: z.number().min(1, 'Max uses must be at least 1'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
}).refine(data => {
  if (data.discountType === 'PERCENTAGE' && data.discountValue > 100) return false;
  return true;
}, { message: 'Percentage discount cannot exceed 100', path: ['discountValue'] });

export type CouponFormData = z.infer<typeof CouponSchema>;

export interface CouponsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export interface CouponsStatsBarProps {
  activeCoupons: number;
  totalRedeemed: number;
}

export interface CouponsTableProps {
  coupons: Coupon[];
  onToggleStatus: (id: string, status: CouponStatus) => void;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}

export interface CouponsTableRowProps {
  coupon: Coupon;
  onToggleStatus: (id: string, status: CouponStatus) => void;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}

export interface CouponsStatusBadgeProps {
  status: CouponStatus;
}

export interface CouponsEmptyStateProps {
  onCreateClick: () => void;
}
