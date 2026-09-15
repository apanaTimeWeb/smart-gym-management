// RESPONSIBILITY: Encapsulates functionality for superadmin_features_types.ts
import { z } from 'zod';

export const FeatureFlagSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isGlobalEnabled: z.boolean(),
  enabledTenantIds: z.array(z.string())
});
export type FeatureFlag = z.infer<typeof FeatureFlagSchema>;

export const ReleaseNoteSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  content: z.string(),
  date: z.string(),
  isPublished: z.boolean()
});
export type ReleaseNote = z.infer<typeof ReleaseNoteSchema>;

export const SuperadminFeaturesTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string()
});
export type SuperadminFeaturesTenant = z.infer<typeof SuperadminFeaturesTenantSchema>;
