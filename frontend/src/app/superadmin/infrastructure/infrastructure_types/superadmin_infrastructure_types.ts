import { z } from 'zod';
export const InfrastructureNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  cpuPercent: z.number().nullable(),
  memoryPercent: z.number().nullable(),
  diskPercent: z.number().nullable(),
  status: z.string(),
});
export type InfrastructureNode = z.infer<typeof InfrastructureNodeSchema>;

export const RedisTelemetrySchema = z.object({
  memoryUsagePercent: z.number(),
  hitRatioPercent: z.number(),
  totalKeysCached: z.number(),
  uptimeHours: z.number(),
});
export type RedisTelemetry = z.infer<typeof RedisTelemetrySchema>;
