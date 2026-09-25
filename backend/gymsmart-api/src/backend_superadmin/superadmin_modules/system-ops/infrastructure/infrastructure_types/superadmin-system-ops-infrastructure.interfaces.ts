// RESPONSIBILITY: Defines domain/data transfer shapes for the infrastructure feature without ORM leakage.
// FLOW: DTO -> InfrastructureInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminInfrastructureListQuery as the interface-level contract for superadmin-system-ops-infrastructure.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminInfrastructureListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
/**
 * Primary Intent: Defines the SuperadminInfrastructureCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminInfrastructureCreateInput {
  name?: string;
  region?: string;
  status?: string;
  cpuPercent?: number;
  memoryPercent?: number;
  diskPercent?: number;
  uptime?: string;
  lastChecked?: Date;
}
/**
 * Primary Intent: Defines the SuperadminInfrastructureUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminInfrastructureUpdateInput extends SuperadminInfrastructureCreateInput {}

/**
 * Primary Intent: Defines SuperadminInfrastructureDomainModel as the interface-level contract for superadmin-system-ops-infrastructure.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminInfrastructureDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  region: string;
  status: string;
  cpuPercent: number;
  memoryPercent: number;
  diskPercent: number;
  uptime: string;
  lastChecked: Date;
}
