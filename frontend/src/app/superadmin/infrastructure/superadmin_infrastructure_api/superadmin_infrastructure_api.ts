// RESPONSIBILITY: Modularized API client for the Infrastructure module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminInfrastructureUrlConfig } from '@/app/superadmin/infrastructure/superadmin_infrastructure_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { InfrastructureNode } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { RedisTelemetry } from '@/app/superadmin/infrastructure/infrastructure_types/infrastructure_types';

export const infrastructureApi = {
  fetchInfrastructureNodes: () => apiFetch<ApiResponse<InfrastructureNode[]>>(SuperadminInfrastructureUrlConfig.BACKEND_API.INFRASTRUCTURE_BASE),
  fetchRedisTelemetry: () => apiFetch<ApiResponse<RedisTelemetry>>(SuperadminInfrastructureUrlConfig.BACKEND_API.REDIS_TELEMETRY),
  flushGlobalCache: () => apiFetch<ApiResponse<void>>(SuperadminInfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, { method: 'POST' }),
  flushTenantCache: (tenantIds: string[]) => apiFetch<ApiResponse<void>>(SuperadminInfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, { method: 'POST', body: JSON.stringify({ tenantIds }) }),
};
