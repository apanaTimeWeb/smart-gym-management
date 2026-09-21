// RESPONSIBILITY: Defines domain/data transfer shapes for the compliance feature without ORM leakage.
// FLOW: DTO -> ComplianceInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface ComplianceListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface ComplianceCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface ComplianceUpdateInput extends ComplianceCreateInput {}

export interface ComplianceDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
