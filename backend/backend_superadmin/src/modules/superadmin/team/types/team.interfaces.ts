// RESPONSIBILITY: Defines domain/data transfer shapes for the team feature without ORM leakage.
// FLOW: DTO -> TeamInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface TeamListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface TeamCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface TeamUpdateInput extends TeamCreateInput {}

export interface TeamDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
