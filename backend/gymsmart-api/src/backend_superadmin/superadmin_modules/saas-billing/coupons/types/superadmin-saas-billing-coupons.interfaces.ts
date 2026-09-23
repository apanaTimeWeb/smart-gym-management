// RESPONSIBILITY: Defines domain/data transfer shapes for the coupons feature without ORM leakage.
// FLOW: DTO -> CouponsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminCouponsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface SuperadminCouponsCreateInput {
  code?: string;
  discountType?: string;
  discountValue?: number;
  maxUses?: number;
  currentUses?: number;
  status?: string;
  expiryDate?: Date;
}
export interface SuperadminCouponsUpdateInput extends SuperadminCouponsCreateInput {}

export interface SuperadminCouponsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
  currentUses: number;
  status: string;
  expiryDate: Date;
}
