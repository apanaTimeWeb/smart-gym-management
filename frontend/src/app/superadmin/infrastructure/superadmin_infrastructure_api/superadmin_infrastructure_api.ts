// RESPONSIBILITY: Modularized API client for the Infrastructure module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { InfrastructureUrlConfig } from '@/app/superadmin/infrastructure/superadmin_infrastructure_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { InfrastructureNode, RedisTelemetry, SuperadminInfrastructureTenant } from '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types';
import { z } from "zod";
import { InfrastructureNodeSchema, RedisTelemetrySchema, SuperadminInfrastructureTenantSchema } from '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types';
export const infrastructureApi = {
    fetchInfrastructureNodes: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<InfrastructureNode[]>>(`${InfrastructureUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(InfrastructureNodeSchema) });
    },
    fetchRedisTelemetry: () => apiFetch<ApiResponse<RedisTelemetry>>(InfrastructureUrlConfig.BACKEND_API.REDIS_TELEMETRY, { dataSchema: RedisTelemetrySchema }),
    flushGlobalCache: () => apiFetch<ApiResponse<void>>(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, { method: 'POST', dataSchema: z.null() }),
    flushTenantCache: (tenantIds: string[]) => apiFetch<ApiResponse<void>>(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, { method: 'POST', body: JSON.stringify({ tenantIds }), dataSchema: z.null() }),
    fetchTenants: () => apiFetch<ApiResponse<SuperadminInfrastructureTenant[]>>(InfrastructureUrlConfig.BACKEND_API.TENANTS, { dataSchema: z.array(SuperadminInfrastructureTenantSchema) }),
};
