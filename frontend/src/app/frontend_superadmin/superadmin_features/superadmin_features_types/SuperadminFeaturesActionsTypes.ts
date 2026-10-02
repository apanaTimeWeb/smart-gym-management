/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminFeaturesActionsTypes owned by the superadmin_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes, @/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesData
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { useSuperadminFeaturesData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesData';

import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';



export interface SuperadminFeaturesActionsConfig {
  publishNote: ReturnType<typeof useSuperadminFeaturesData>['publishNote'];
  updateFeatureFlagStatus: ReturnType<typeof useSuperadminFeaturesData>['updateFeatureFlagStatus'];
  updateFlag: ReturnType<typeof useSuperadminFeaturesData>['updateFlag'];
  rolloutFlag: FeatureFlag | null;
  resetReleaseNoteForm: () => void;
}
