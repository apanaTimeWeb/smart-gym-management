import { z } from 'zod';

export const SuperadminFeaturesV1DataSchema = z.object({ rollouts: z.array(z.object({ feature: z.string(), rollout: z.number(), target: z.string(), status: z.string(), health: z.number() })), releases: z.array(z.object({ version: z.string(), date: z.string(), summary: z.string(), impact: z.string() })), rollback: z.array(z.object({ feature: z.string(), lastRollback: z.string(), lastHealthy: z.string() })) });
