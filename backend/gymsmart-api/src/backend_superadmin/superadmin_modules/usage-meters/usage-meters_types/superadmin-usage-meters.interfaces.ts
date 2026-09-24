// RESPONSIBILITY: Defines domain/data transfer shapes for the usage-meters feature without ORM leakage.
// FLOW: DTO -> UsageMetersInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminUsageMetersListQuery as the interface-level contract for superadmin-usage-meters.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminUsageMetersListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  tenantId?: string;}
/**
 * Primary Intent: Defines the SuperadminUsageMetersCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminUsageMetersCreateInput {
  tenantId?: string;
  tenantName?: string;
  smsSent?: number;
  smsLimit?: number;
  whatsappMessagesSent?: number;
  whatsappLimit?: number;
  emailsSent?: number;
  emailLimit?: number;
  apiCallsCount?: number;
  apiCallsLimit?: number;
  databaseGb?: number;
  mediaGb?: number;
  storageLimitGb?: number;
  activeMembers?: number;
  totalMembers?: number;
  memberLimit?: number;
  staffCount?: number;
  staffLimit?: number;
  billingCycleEnd?: Date;
}
/**
 * Primary Intent: Defines SuperadminUsageMetersUpdateInput as the interface-level contract for superadmin-usage-meters.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminUsageMetersUpdateInput extends SuperadminUsageMetersCreateInput {}

/**
 * Primary Intent: Defines the SuperadminUsageMetersDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminUsageMetersDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  smsSent: number;
  smsLimit: number;
  whatsappMessagesSent: number;
  whatsappLimit: number;
  emailsSent: number;
  emailLimit: number;
  apiCallsCount: number;
  apiCallsLimit: number;
  databaseGb: number;
  mediaGb: number;
  storageLimitGb: number;
  activeMembers: number;
  totalMembers: number;
  memberLimit: number;
  staffCount: number;
  staffLimit: number;
  billingCycleEnd: Date;
}
