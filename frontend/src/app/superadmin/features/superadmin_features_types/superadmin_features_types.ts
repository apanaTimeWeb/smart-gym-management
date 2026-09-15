// RESPONSIBILITY: Encapsulates functionality for superadmin_features_types.ts
import { z } from 'zod';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isGlobalEnabled: boolean;
  enabledTenantIds: string[];
}

export interface ReleaseNote {
  id: string;
  version: string;
  title: string;
  content: string;
  date: string;
  isPublished: boolean;
}

export const FeatureFlagSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isGlobalEnabled: z.boolean(),
  enabledTenantIds: z.array(z.string())
});

export const ReleaseNoteSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  content: z.string(),
  date: z.string(),
  isPublished: z.boolean()
});

export interface SuperadminFeaturesTenant {
  id: string;
  name: string;
  plan: string;
}

