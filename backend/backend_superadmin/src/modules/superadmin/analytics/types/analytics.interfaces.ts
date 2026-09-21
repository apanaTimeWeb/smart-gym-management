// RESPONSIBILITY: Defines domain/data transfer shapes for the analytics feature without ORM leakage.
// FLOW: DTO -> AnalyticsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface AnalyticsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface AnalyticsCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface AnalyticsUpdateInput extends AnalyticsCreateInput {}

export interface AnalyticsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}
