// RESPONSIBILITY: Defines domain/data transfer shapes for the jobs feature without ORM leakage.
// FLOW: DTO -> JobsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminJobsListQuery as the interface-level contract for superadmin-system-ops-jobs.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminJobsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
/**
 * Primary Intent: Defines the SuperadminJobsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminJobsCreateInput {
  queueName?: string;
  jobName?: string;
  status?: string;
  attempts?: number;
  error?: string;
  tenantId?: string;
}
/**
 * Primary Intent: Defines the SuperadminJobsUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminJobsUpdateInput extends SuperadminJobsCreateInput {}

/**
 * Primary Intent: Defines the SuperadminJobsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminJobsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  queueName: string;
  jobName: string;
  status: string;
  attempts: number;
  error: string;
  tenantId: string;
}
