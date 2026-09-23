// RESPONSIBILITY: Defines domain/data transfer shapes for the system-ops feature without ORM leakage.
// FLOW: DTO -> SystemOpsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminSystemOpsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminSystemOpsCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface SuperadminSystemOpsUpdateInput extends SuperadminSystemOpsCreateInput {}

export interface SuperadminSystemOpsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
