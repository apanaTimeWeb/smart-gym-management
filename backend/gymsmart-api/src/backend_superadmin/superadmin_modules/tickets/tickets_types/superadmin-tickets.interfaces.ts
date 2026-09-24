// RESPONSIBILITY: Defines domain/data transfer shapes for the tickets feature without ORM leakage.
// FLOW: DTO -> TicketsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminTicketsListQuery as the interface-level contract for superadmin-tickets.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminTicketsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
/**
 * Primary Intent: Defines the SuperadminTicketsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminTicketsCreateInput {
  tenantId?: string;
  tenantName?: string;
  reporterEmail?: string;
  subject?: string;
  description?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  attachments?: unknown;
  slaDeadline?: Date | null;
  firstResponseAt?: Date | null;
  resolutionTime?: number;
  messages?: unknown;
  lastUpdated?: Date;
}
/**
 * Primary Intent: Defines SuperadminTicketsUpdateInput as the interface-level contract for superadmin-tickets.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminTicketsUpdateInput extends SuperadminTicketsCreateInput {}

/**
 * Primary Intent: Defines the SuperadminTicketsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminTicketsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  reporterEmail: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  attachments: unknown;
  slaDeadline: Date | null;
  firstResponseAt: Date | null;
  resolutionTime: number;
  messages: unknown;
  lastUpdated: Date;
}
/**
 * Primary Intent: Defines SuperadminTicketsServiceInsightsRow as the interface-level contract for superadmin-tickets.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminTicketsServiceInsightsRow { id:string; createdAt:Date; status:string; priority:string; assignedTo:string|null; slaDeadline:Date|null; firstResponseAt:Date|null; resolutionTime:number; satisfactionScore:number|null; subject:string; description:string; }
