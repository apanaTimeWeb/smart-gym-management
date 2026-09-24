// RESPONSIBILITY: Defines domain/data transfer shapes for the broadcasts feature without ORM leakage.
// FLOW: DTO -> BroadcastsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminBroadcastsListQuery as the interface-level contract for superadmin-broadcasts.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminBroadcastsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
/**
 * Primary Intent: Defines the SuperadminBroadcastsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminBroadcastsCreateInput {
  title?: string;
  content?: string;
  status?: string;
  targetGymIds?: unknown;
  scheduledDate?: Date | null;
  sentDate?: Date | null;
  totalRecipients?: number;
  deliveredCount?: number;
  failedCount?: number;
  audience?: string;
  channel?: string;
  openedCount?: number;
  clickedCount?: number;
}

/**
 * Primary Intent: Defines SuperadminBroadcastsUpdateInput as the interface-level contract for superadmin-broadcasts.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminBroadcastsUpdateInput extends SuperadminBroadcastsCreateInput {}

/**
 * Primary Intent: Defines the SuperadminBroadcastsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminBroadcastsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  title: string;
  content: string;
  status: string;
  targetGymIds: unknown;
  scheduledDate: Date | null;
  sentDate: Date | null;
  totalRecipients: number;
  deliveredCount: number;
  failedCount: number;
  audience: string;
}
