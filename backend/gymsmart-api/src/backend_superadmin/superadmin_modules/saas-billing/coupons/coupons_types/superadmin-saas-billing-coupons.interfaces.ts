// RESPONSIBILITY: Defines domain/data transfer shapes for the coupons feature without ORM leakage.
// FLOW: DTO -> CouponsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminCouponsListQuery as the interface-level contract for superadmin-saas-billing-coupons.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminCouponsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
/**
 * Primary Intent: Defines the SuperadminCouponsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminCouponsCreateInput {
  code?: string;
  discountType?: string;
  discountValue?: number;
  currency?: string;
  maxUses?: number;
  currentUses?: number;
  status?: string;
  expiryDate?: Date;
}
/**
 * Primary Intent: Defines the SuperadminCouponsUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminCouponsUpdateInput extends SuperadminCouponsCreateInput {}

/**
 * Primary Intent: Defines the SuperadminCouponsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminCouponsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  code: string;
  discountType: string;
  discountValue: number;
  currency: string | null;
  maxUses: number;
  currentUses: number;
  status: string;
  expiryDate: Date;
}
