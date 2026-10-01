import { z } from 'zod';

import { FeatureFlagSchema, ReleaseNoteSchema, SuperadminFeatureHistoryEntrySchema, SuperadminFeaturesTenantSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesTypesSchemas';

export const SuperadminFeaturesTenantsDataSchema = z.array(SuperadminFeaturesTenantSchema);
export const SuperadminFeaturesListDataSchema = z.object({
  flags: z.array(FeatureFlagSchema),
  notes: z.array(ReleaseNoteSchema),
});
export const SuperadminFeaturesHistoryDataSchema = z.array(SuperadminFeatureHistoryEntrySchema);
export const SuperadminFeaturesDeleteDataSchema = z.null();
