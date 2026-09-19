// RESPONSIBILITY: Owns UI-only types and schema contracts for Feature Flags and Release Notes.
import { z } from 'zod';
import type { FeatureFlag } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
export const RELEASE_NOTE_TABS = ['FLAGS', 'NOTES'] as const;
export type FeaturesTab = (typeof RELEASE_NOTE_TABS)[number];
export const releaseNoteSchema = z.object({
  version: z.string().trim().min(1, 'Version is required'),
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
});
export type ReleaseNoteFormValues = z.infer<typeof releaseNoteSchema>;
export interface SuperadminFeatureRolloutModalProps {
    isOpen: boolean;
    onClose: () => void;
    flag: FeatureFlag | null;
    onSaveRollout: (tenantIds: string[]) => Promise<void>;
}
