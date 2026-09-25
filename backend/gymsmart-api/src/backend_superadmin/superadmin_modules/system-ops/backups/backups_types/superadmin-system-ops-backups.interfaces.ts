// RESPONSIBILITY: Defines domain/data transfer shapes for the backups feature without ORM leakage.
// FLOW: DTO -> BackupsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminBackupsListQuery as the interface-level contract for superadmin-system-ops-backups.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminBackupsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
/**
 * Primary Intent: Defines the SuperadminBackupsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminBackupsCreateInput {
  tenantId?: string;
  tenantName?: string;
  databaseName?: string;
  sizeMB?: number;
  status?: string;
  timestamp?: Date;
  artifactPath?: string | null;
  jobId?: string | null;
}
/**
 * Primary Intent: Defines the SuperadminBackupsUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminBackupsUpdateInput extends SuperadminBackupsCreateInput {}

/**
 * Primary Intent: Defines SuperadminBackupsDomainModel as the interface-level contract for superadmin-system-ops-backups.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminBackupsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantName: string;
  databaseName: string;
  sizeMB: number;
  status: string;
  timestamp: Date;
  tenantId: string;
  artifactPath: string | null;
  jobId: string | null;
}
/**
 * Primary Intent: Defines the SuperadminBackupsSchedulePayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminBackupsSchedulePayload { cronExpression: string; retentionDays: number; updatedAt: string; }
