import { z } from 'zod';

export const NodeStatusSchema = z.enum(['HEALTHY', 'DEGRADED', 'DOWN']);

export const CacheStatusSchema = z.enum(['CONNECTED', 'DISCONNECTED', 'STALE']);

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

export const RedisTelemetrySchema = z.object({
    status: CacheStatusSchema,
    memoryUsagePercent: z.number(),
    hitRatioPercent: z.number(),
    totalKeysCached: z.number(),
    uptimeHours: z.number(),
});

export const SuperadminInfrastructureTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
});
