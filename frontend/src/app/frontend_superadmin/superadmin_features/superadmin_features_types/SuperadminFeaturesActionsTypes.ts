import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import { useSuperadminFeaturesData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesData';

export interface SuperadminFeaturesActionsConfig {
  publishNote: ReturnType<typeof useSuperadminFeaturesData>['publishNote'];
  updateFeatureFlagStatus: ReturnType<typeof useSuperadminFeaturesData>['updateFeatureFlagStatus'];
  updateFlag: ReturnType<typeof useSuperadminFeaturesData>['updateFlag'];
  rolloutFlag: FeatureFlag | null;
  resetReleaseNoteForm: () => void;
}
