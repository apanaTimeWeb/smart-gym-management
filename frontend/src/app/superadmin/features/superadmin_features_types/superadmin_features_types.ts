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
  key: z.string(),
  description: z.string(),
  isEnabled: z.boolean(),
  rolloutPercentage: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const ReleaseNoteSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  publishedAt: z.string().optional(),
  authorId: z.string()
});
