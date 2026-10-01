import { z } from 'zod';

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

export const SuperadminFeaturesTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string()
});

export const SuperadminFeatureHistoryEntrySchema = z.object({ id: z.string(), action: z.string(), user: z.string(), timestamp: z.string() });
