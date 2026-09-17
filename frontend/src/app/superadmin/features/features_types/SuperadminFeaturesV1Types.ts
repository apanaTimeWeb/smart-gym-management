// RESPONSIBILITY: Defines the runtime-validated data contract for Feature Rollouts & Release History.
import { z } from 'zod';
export const SuperadminFeaturesV1DataSchema = z.object({ rollouts: z.array(z.object({ feature: z.string(), rollout: z.number(), target: z.string(), status: z.string(), health: z.number() })), releases: z.array(z.object({ version: z.string(), date: z.string(), summary: z.string(), impact: z.string() })), rollback: z.array(z.object({ feature: z.string(), lastRollback: z.string(), lastHealthy: z.string() })) });
export const SuperadminFeaturesV1ResponseSchema = z.object({ data: SuperadminFeaturesV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminFeaturesV1Data = z.infer<typeof SuperadminFeaturesV1DataSchema>;
export type SuperadminFeaturesV1Response = z.infer<typeof SuperadminFeaturesV1ResponseSchema>;
export interface SuperadminFeaturesV1SectionProps {
    data: SuperadminFeaturesV1Data;
}
