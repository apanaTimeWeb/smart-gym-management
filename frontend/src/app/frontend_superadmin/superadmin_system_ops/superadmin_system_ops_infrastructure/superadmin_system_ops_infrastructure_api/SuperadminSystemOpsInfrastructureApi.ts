import { RedisTelemetrySchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureSchema';
import { SuperadminInfrastructureTenantListDataSchema, SuperadminInfrastructureNullDataSchema, SuperadminInfrastructureNodesDataSchema, SuperadminInfrastructureUptimeDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureApi owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureApiSchema, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureSchema, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureUptimeSchema, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureTypes, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureUptimeTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Infrastructure module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config';

import type { InfrastructureNode, RedisTelemetry, SuperadminInfrastructureTenant } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureTypes';
import type { SuperadminInfrastructureUptimePoint } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureUptimeTypes';
import type { ApiResponse } from '@/lib/api';



export const infrastructureApi = {
    fetchInfrastructureNodes: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<InfrastructureNode[]>>(`${MODULE_URLS.BACKEND_API.BASE}${q}`, { dataSchema: SuperadminInfrastructureNodesDataSchema });
    },
    fetchRedisTelemetry: () => apiFetch<ApiResponse<RedisTelemetry>>(MODULE_URLS.BACKEND_API.REDIS_TELEMETRY, { dataSchema: RedisTelemetrySchema }),
    fetchUptimeHistory: () => apiFetch<ApiResponse<SuperadminInfrastructureUptimePoint[]>>(`${MODULE_URLS.BACKEND_API.BASE}/uptime-history`, { dataSchema: SuperadminInfrastructureUptimeDataSchema }),
    flushGlobalCache: (idempotencyKey: string) => apiFetch<ApiResponse<void>>(MODULE_URLS.BACKEND_API.REDIS_FLUSH_GLOBAL, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminInfrastructureNullDataSchema }),
    flushTenantCache: (tenantIds: string[], idempotencyKey: string) => apiFetch<ApiResponse<void>>(MODULE_URLS.BACKEND_API.REDIS_FLUSH_TENANT, { method: 'POST', body: JSON.stringify({ tenantIds }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminInfrastructureNullDataSchema }),
    fetchTenants: () => apiFetch<ApiResponse<SuperadminInfrastructureTenant[]>>(MODULE_URLS.BACKEND_API.TENANTS, { dataSchema: SuperadminInfrastructureTenantListDataSchema }),
};
