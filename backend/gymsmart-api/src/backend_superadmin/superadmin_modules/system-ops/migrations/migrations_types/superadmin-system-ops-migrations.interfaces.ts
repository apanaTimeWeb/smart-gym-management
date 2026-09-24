// RESPONSIBILITY: Defines domain/data transfer shapes for the migrations feature without ORM leakage.
// FLOW: DTO -> MigrationsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminMigrationsListQuery as the interface-level contract for superadmin-system-ops-migrations.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminMigrationsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
/**
 * Primary Intent: Defines the SuperadminMigrationsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminMigrationsCreateInput {
  version?: string;
  description?: string;
  appliedAt?: Date | null;
  status?: string;
  targetTenants?: unknown;
  durationMs?: number;
  errorLog?: string | null;
  executedAt?: Date | null;
  executedBy?: string;
  errorDetails?: string | null;
}
/**
 * Primary Intent: Defines SuperadminMigrationsUpdateInput as the interface-level contract for superadmin-system-ops-migrations.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminMigrationsUpdateInput extends SuperadminMigrationsCreateInput {}

/**
 * Primary Intent: Defines the SuperadminMigrationsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminMigrationsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  version: string;
  description: string;
  appliedAt: Date | null;
  status: string;
  targetTenants: unknown;
  durationMs: number;
  errorLog: string;
  executedAt: Date | null;
  executedBy: string;
  errorDetails: string;
}
