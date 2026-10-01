// RESPONSIBILITY: Modularized API client for the Infrastructure module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminInfrastructureNodesDataSchema, SuperadminInfrastructureNullDataSchema, SuperadminInfrastructureTenantListDataSchema, SuperadminInfrastructureUptimeDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminSystemOpsInfrastructureUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config';
import { InfrastructureNodeSchema, RedisTelemetrySchema, SuperadminInfrastructureTenantSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureSchema';
import { SuperadminInfrastructureUptimePointSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureUptimeSchema';

import type { InfrastructureNode, RedisTelemetry, SuperadminInfrastructureTenant } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureTypes';
import type { SuperadminInfrastructureUptimePoint } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureUptimeTypes';
import type { ApiResponse } from '@/lib/api';

export const infrastructureApi = {
    fetchInfrastructureNodes: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<InfrastructureNode[]>>(`${SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: SuperadminInfrastructureNodesDataSchema });
    },
    fetchRedisTelemetry: () => apiFetch<ApiResponse<RedisTelemetry>>(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.REDIS_TELEMETRY, { dataSchema: RedisTelemetrySchema }),
    fetchUptimeHistory: () => apiFetch<ApiResponse<SuperadminInfrastructureUptimePoint[]>>(`${SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.BASE}/uptime-history`, { dataSchema: SuperadminInfrastructureUptimeDataSchema }),
    flushGlobalCache: (idempotencyKey: string) => apiFetch<ApiResponse<void>>(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminInfrastructureNullDataSchema }),
    flushTenantCache: (tenantIds: string[], idempotencyKey: string) => apiFetch<ApiResponse<void>>(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, { method: 'POST', body: JSON.stringify({ tenantIds }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminInfrastructureNullDataSchema }),
    fetchTenants: () => apiFetch<ApiResponse<SuperadminInfrastructureTenant[]>>(SuperadminSystemOpsInfrastructureUrlConfig.BACKEND_API.TENANTS, { dataSchema: SuperadminInfrastructureTenantListDataSchema }),
};
