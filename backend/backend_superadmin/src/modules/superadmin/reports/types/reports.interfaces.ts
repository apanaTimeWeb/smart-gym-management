// RESPONSIBILITY: Defines domain/data transfer shapes for the reports feature without ORM leakage.
// FLOW: DTO -> ReportsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface ReportsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface ReportsCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface ReportsUpdateInput extends ReportsCreateInput {}

export interface ReportsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
