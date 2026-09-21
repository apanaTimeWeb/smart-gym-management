// RESPONSIBILITY: Defines domain/data transfer shapes for the system-ops feature without ORM leakage.
// FLOW: DTO -> SystemOpsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface SystemOpsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SystemOpsCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface SystemOpsUpdateInput extends SystemOpsCreateInput {}

export interface SystemOpsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
