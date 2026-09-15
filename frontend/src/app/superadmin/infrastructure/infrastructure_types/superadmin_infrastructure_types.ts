// RESPONSIBILITY: TypeScript types for the Superadmin Infrastructure module.
import { z } from 'zod';

export const NodeStatusSchema = z.enum(['HEALTHY', 'DEGRADED', 'DOWN']);
export type NodeStatus = z.infer<typeof NodeStatusSchema>;

export const CacheStatusSchema = z.enum(['CONNECTED', 'DISCONNECTED', 'STALE']);
export type CacheStatus = z.infer<typeof CacheStatusSchema>;

export const InfrastructureNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  status: NodeStatusSchema,
  cpuPercent: z.number().nullable(),
  memoryPercent: z.number().nullable(),
  diskPercent: z.number().nullable(),
  uptime: z.string(),
  lastChecked: z.string(),
});
export type InfrastructureNode = z.infer<typeof InfrastructureNodeSchema>;

export const RedisTelemetrySchema = z.object({
  status: CacheStatusSchema,
  memoryUsagePercent: z.number(),
  hitRatioPercent: z.number(),
  totalKeysCached: z.number(),
  uptimeHours: z.number(),
});
export type RedisTelemetry = z.infer<typeof RedisTelemetrySchema>;

export const SuperadminInfrastructureTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type SuperadminInfrastructureTenant = z.infer<typeof SuperadminInfrastructureTenantSchema>;
