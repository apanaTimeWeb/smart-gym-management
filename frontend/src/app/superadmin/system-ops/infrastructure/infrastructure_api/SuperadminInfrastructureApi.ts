// RESPONSIBILITY: Modularized API client for the Infrastructure module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { InfrastructureUrlConfig } from '@/app/superadmin/system-ops/infrastructure/superadmin_infrastructure_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { InfrastructureNode, RedisTelemetry, SuperadminInfrastructureTenant } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureTypes';
import type { SuperadminInfrastructureUptimePoint } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureUptimeTypes';
import { z } from "zod";
import { InfrastructureNodeSchema, RedisTelemetrySchema, SuperadminInfrastructureTenantSchema } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureTypes';
import { SuperadminInfrastructureUptimePointSchema } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureUptimeTypes';
export const infrastructureApi = {
    fetchInfrastructureNodes: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<InfrastructureNode[]>>(`${InfrastructureUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(InfrastructureNodeSchema) });
    },
    fetchRedisTelemetry: () => apiFetch<ApiResponse<RedisTelemetry>>(InfrastructureUrlConfig.BACKEND_API.REDIS_TELEMETRY, { dataSchema: RedisTelemetrySchema }),
    fetchUptimeHistory: () => apiFetch<ApiResponse<SuperadminInfrastructureUptimePoint[]>>(`${InfrastructureUrlConfig.BACKEND_API.BASE}/uptime-history`, { dataSchema: z.array(SuperadminInfrastructureUptimePointSchema) }),
    flushGlobalCache: (idempotencyKey?: string) => apiFetch<ApiResponse<void>>(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, { method: 'POST', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: z.null() }),
    flushTenantCache: (tenantIds: string[], idempotencyKey?: string) => apiFetch<ApiResponse<void>>(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, { method: 'POST', body: JSON.stringify({ tenantIds }), headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: z.null() }),
    fetchTenants: () => apiFetch<ApiResponse<SuperadminInfrastructureTenant[]>>(InfrastructureUrlConfig.BACKEND_API.TENANTS, { dataSchema: z.array(SuperadminInfrastructureTenantSchema) }),
};
