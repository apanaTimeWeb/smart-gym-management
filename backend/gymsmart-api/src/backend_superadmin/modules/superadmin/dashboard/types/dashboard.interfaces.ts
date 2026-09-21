// RESPONSIBILITY: Defines domain/data transfer shapes for the dashboard feature without ORM leakage.
// FLOW: DTO -> DashboardInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface DashboardListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface DashboardCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface DashboardUpdateInput extends DashboardCreateInput {}

export interface DashboardDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
