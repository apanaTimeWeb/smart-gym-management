// RESPONSIBILITY: Named mutation contracts for Superadmin feature flag and release-note writes.
import type { FeatureFlag, ReleaseNote } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
export interface SuperadminFeatureFlagStatusMutationInput { id: string; enabled: boolean; idempotencyKey: string; }
export interface SuperadminFeatureFlagUpdateMutationInput { id: string; body: Partial<FeatureFlag>; idempotencyKey: string; }
export interface SuperadminReleaseNoteCreateMutationInput { data: Partial<ReleaseNote>; idempotencyKey: string; }

export interface SuperadminFeatureRolloutMutationConfig {
  onSaveRollout: (tenantIds: string[], idempotencyKey: string) => Promise<void>;
  onSuccess: () => void;
}
