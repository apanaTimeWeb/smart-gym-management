// RESPONSIBILITY: System-local API boundary for migration health and global audit logs.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SystemUrlConfig } from '@/app/superadmin/system/superadmin_system_url_config';
import { SuperadminSystemTenantSchema, SuperadminSystemAuditLogSchema, type SuperadminSystemTenant, type SuperadminSystemAuditLog } from '@/app/superadmin/system/system_types/superadmin_system_types';
import { z } from 'zod';
import type { SuperadminTenantSla } from '@/app/superadmin/system/system_types/SuperadminSystemTypes';

const SuperadminTenantSlaSchema = z.object({ id: z.string(), name: z.string(), targetSla: z.number(), actualUptime: z.number(), downtimeIncidents: z.number(), downtimeMinutes: z.number(), status: z.enum(['MET', 'BREACHED', 'WARNING']) });
export const systemApi = {
  fetchSystemInfo: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SuperadminTenantSla[]>>(`${SystemUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SuperadminTenantSlaSchema) });
  },
  fetchHealthProbe: () => apiFetch<ApiResponse<{ status: string }>>(`${SystemUrlConfig.BACKEND_API.BASE}/health`, { dataSchema: z.object({ status: z.string(), timestamp: z.string().optional(), checks: z.object({}).catchall(z.unknown()).optional() }).passthrough() }),

  fetchMigrations: () => apiFetch<ApiResponse<{ tenants: SuperadminSystemTenant[] }>>(SystemUrlConfig.BACKEND_API.MIGRATIONS, { dataSchema: z.object({ tenants: z.array(SuperadminSystemTenantSchema) }).passthrough() }),
  startMigration: (tenantId: string) => apiFetch<ApiResponse<void>>(SystemUrlConfig.BACKEND_API.MIGRATION_TRIGGER, { method: 'POST', body: JSON.stringify({ tenantId }), dataSchema: z.object({}).passthrough() }),
  fetchAuditLogs: (params?: Record<string, string>) => { const q = params ? `?${new URLSearchParams(params).toString()}` : ''; return apiFetch<ApiResponse<SuperadminSystemAuditLog[]>>(`${SystemUrlConfig.BACKEND_API.AUDIT_LOGS}${q}`, { dataSchema: z.array(SuperadminSystemAuditLogSchema) }); },
};
