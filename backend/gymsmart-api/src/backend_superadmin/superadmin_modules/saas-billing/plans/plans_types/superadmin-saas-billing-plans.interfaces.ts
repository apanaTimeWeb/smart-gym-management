// RESPONSIBILITY: Defines domain/data transfer shapes for the plans feature without ORM leakage.
// FLOW: DTO -> PlansInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminPlansListQuery as the interface-level contract for superadmin-saas-billing-plans.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminPlansListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
/**
 * Primary Intent: Defines the SuperadminPlansCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminPlansCreateInput {
  name?: string;
  priceMonthly?: number;
  priceAnnual?: number;
  maxMembers?: number;
  maxStaff?: number;
  dbLimitGb?: number;
  binaryLimitGb?: number;
  features?: unknown;
  activeTenants?: number;
  isPublic?: boolean;
  trialDays?: number;
  setupFee?: number;
  currency?: string;
  isArchived?: boolean;
}
/**
 * Primary Intent: Defines SuperadminPlansUpdateInput as the interface-level contract for superadmin-saas-billing-plans.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminPlansUpdateInput extends SuperadminPlansCreateInput {}

/**
 * Primary Intent: Defines the SuperadminPlansDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminPlansDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  maxMembers: number;
  maxStaff: number;
  dbLimitGb: number;
  binaryLimitGb: number;
  features: unknown;
  activeTenants: number;
  isPublic: boolean;
  trialDays: number;
  setupFee: number;
  currency: string;
  isArchived: boolean;
}
