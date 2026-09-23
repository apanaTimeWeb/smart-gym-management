// RESPONSIBILITY: Defines domain/data transfer shapes for the team feature without ORM leakage.
// FLOW: DTO -> TeamInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminTeamListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminTeamCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface SuperadminTeamUpdateInput extends SuperadminTeamCreateInput {}

export interface SuperadminTeamDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
