/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminFeaturesUiTypes owned by the superadmin_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesUiSchema, @/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns UI-only types and schema contracts for Feature Flags and Release Notes.
import { releaseNoteSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesUiSchema';

import type { SUPERADMIN_FEATURES_TABS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_constants/SuperadminFeaturesUiConstants';
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { infer as ZodInfer } from 'zod';


export type FeaturesTab = (typeof SUPERADMIN_FEATURES_TABS)[number];
export type ReleaseNoteFormValues = ZodInfer<typeof releaseNoteSchema>;
export interface SuperadminFeatureRolloutModalProps {
    isOpen: boolean;
    onClose: () => void;
    flag: FeatureFlag | null;
    onSaveRollout: (tenantIds: string[], idempotencyKey: string) => Promise<void>;
}
