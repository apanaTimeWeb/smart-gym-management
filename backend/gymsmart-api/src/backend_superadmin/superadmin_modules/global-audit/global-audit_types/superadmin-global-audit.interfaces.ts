// RESPONSIBILITY: Defines domain/data transfer shapes for the global-audit feature without ORM leakage.
// FLOW: DTO -> GlobalAuditInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminGlobalAuditListQuery as the interface-level contract for superadmin-global-audit.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminGlobalAuditListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  tenantId?: string;}
/**
 * Primary Intent: Defines the SuperadminGlobalAuditCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminGlobalAuditCreateInput {
  actorId?: string;
  actorRole?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string;
  tenantId?: string;
}
/**
 * Primary Intent: Defines the SuperadminGlobalAuditUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminGlobalAuditUpdateInput extends SuperadminGlobalAuditCreateInput {}

/**
 * Primary Intent: Defines SuperadminGlobalAuditDomainModel as the interface-level contract for superadmin-global-audit.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminGlobalAuditDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  actorId: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue: unknown;
  newValue: unknown;
  ipAddress: string;
  tenantId: string;
}
