// RESPONSIBILITY: Modularized API client for the System module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SystemUrlConfig } from '@/app/superadmin/system/superadmin_system_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { z } from 'zod';
import type { SuperadminTenantSla } from '@/app/superadmin/system/system_types/SuperadminSystemTypes';

/** Zod schema for SLA telemetry data returned by the system info endpoint. */
const SuperadminTenantSlaSchema = z.object({
  id: z.string(),
  name: z.string(),
  targetSla: z.number(),
  actualUptime: z.number(),
  downtimeIncidents: z.number(),
  downtimeMinutes: z.number(),
  status: z.enum(['MET', 'BREACHED', 'WARNING']),
});

const SystemInfoSchema = z.object({
  uptime: z.number().optional(),
  version: z.string().optional(),
  tenantSlas: z.array(SuperadminTenantSlaSchema).optional(),
}).passthrough();

const HealthProbeSchema = z.object({
  status: z.string(),
  timestamp: z.string().optional(),
  checks: z.object({}).catchall(z.unknown()).optional(),
}).passthrough();

export const systemApi = {
  fetchSystemInfo: () => apiFetch<ApiResponse<SuperadminTenantSla[]>>(SystemUrlConfig.BACKEND_API.BASE, { dataSchema: z.array(SuperadminTenantSlaSchema) }),
  fetchHealthProbe: () => apiFetch<ApiResponse<{ status: string }>>(`${SystemUrlConfig.BACKEND_API.BASE}/health`, { dataSchema: HealthProbeSchema }),
};
