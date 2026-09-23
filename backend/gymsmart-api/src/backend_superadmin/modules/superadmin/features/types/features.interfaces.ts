// RESPONSIBILITY: Defines domain/data transfer shapes for the features feature without ORM leakage.
// FLOW: DTO -> FeaturesInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface FeaturesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface FeaturesCreateInput {
  name?: string;
  description?: string;
  isGlobalEnabled?: boolean;
  enabledTenantIds?: unknown;
  notes?: unknown;
  history?: unknown;
}
export interface FeaturesUpdateInput extends FeaturesCreateInput {}

export interface FeaturesDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  description: string;
  isGlobalEnabled: boolean;
  enabledTenantIds: unknown;
  notes: unknown;
  history: unknown;
}
