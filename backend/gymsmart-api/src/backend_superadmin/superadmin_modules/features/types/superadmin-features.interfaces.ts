// RESPONSIBILITY: Defines domain/data transfer shapes for the features feature without ORM leakage.
// FLOW: DTO -> FeaturesInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminFeaturesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminFeaturesCreateInput {
  name?: string;
  description?: string;
  isGlobalEnabled?: boolean;
  enabledTenantIds?: unknown;
  notes?: unknown;
  history?: unknown;
}
export interface SuperadminFeaturesUpdateInput extends SuperadminFeaturesCreateInput {}

export interface SuperadminFeaturesDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  description: string;
  isGlobalEnabled: boolean;
  enabledTenantIds: unknown;
  notes: unknown;
  history: unknown;
}
