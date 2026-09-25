// RESPONSIBILITY: Defines domain/data transfer shapes for the messaging feature without ORM leakage.
// FLOW: DTO -> MessagingInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminMessagingListQuery as the interface-level contract for superadmin-messaging.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminMessagingListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
/**
 * Primary Intent: Defines the SuperadminMessagingCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminMessagingCreateInput {
  tenantId?: string;
  tenantName?: string;
  channel?: string;
  subject?: string;
  body?: string;
  status?: string;
  sentAt?: Date | null;
  scheduledAt?: Date | null;
  campaignMetadata?: Record<string, unknown> | null;
}
/**
 * Primary Intent: Defines the SuperadminMessagingUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminMessagingUpdateInput extends SuperadminMessagingCreateInput {}

/**
 * Primary Intent: Defines SuperadminMessagingDomainModel as the interface-level contract for superadmin-messaging.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminMessagingDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  channel: string;
  subject: string;
  body: string;
  status: string;
  sentAt: Date | null;
  scheduledAt: Date | null;
  campaignMetadata: Record<string, unknown> | null;
}
