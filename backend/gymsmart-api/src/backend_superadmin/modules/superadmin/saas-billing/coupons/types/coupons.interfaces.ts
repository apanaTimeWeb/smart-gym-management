// RESPONSIBILITY: Defines domain/data transfer shapes for the coupons feature without ORM leakage.
// FLOW: DTO -> CouponsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface CouponsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface CouponsCreateInput {
  code?: string;
  discountType?: string;
  discountValue?: number;
  maxUses?: number;
  currentUses?: number;
  status?: string;
  expiryDate?: Date;
}
export interface CouponsUpdateInput extends CouponsCreateInput {}

export interface CouponsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
  currentUses: number;
  status: string;
  expiryDate: Date;
}
