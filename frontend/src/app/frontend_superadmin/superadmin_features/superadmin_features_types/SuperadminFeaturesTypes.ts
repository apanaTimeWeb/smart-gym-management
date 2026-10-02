import { FeatureFlagSchema, ReleaseNoteSchema, SuperadminFeaturesTenantSchema, SuperadminFeatureHistoryEntrySchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesTypesSchemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Encapsulates functionality for superadmin_features_types.ts
export type FeatureFlag = ZodInfer<typeof FeatureFlagSchema>;
export type ReleaseNote = ZodInfer<typeof ReleaseNoteSchema>;
export type SuperadminFeaturesTenant = ZodInfer<typeof SuperadminFeaturesTenantSchema>;
export type SuperadminFeatureHistoryEntry = ZodInfer<typeof SuperadminFeatureHistoryEntrySchema>;
