import type { infer as ZodInfer } from 'zod';
import { releaseNoteSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesUiSchema';
// RESPONSIBILITY: Owns UI-only types and schema contracts for Feature Flags and Release Notes.
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';

export const RELEASE_NOTE_TABS = ['FLAGS', 'NOTES', 'TIERS'] as const;
export type FeaturesTab = (typeof RELEASE_NOTE_TABS)[number];
export type ReleaseNoteFormValues = ZodInfer<typeof releaseNoteSchema>;
export interface SuperadminFeatureRolloutModalProps {
    isOpen: boolean;
    onClose: () => void;
    flag: FeatureFlag | null;
    onSaveRollout: (tenantIds: string[], idempotencyKey: string) => Promise<void>;
}
