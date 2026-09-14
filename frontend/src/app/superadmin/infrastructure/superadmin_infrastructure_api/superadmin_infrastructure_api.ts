// RESPONSIBILITY: Modularized API client for the Infrastructure module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { InfrastructureUrlConfig } from '@/app/superadmin/infrastructure/infrastructure_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { InfrastructureNode } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { RedisTelemetry } from '@/app/superadmin/infrastructure/infrastructure_types/infrastructure_types';
import { z } from "zod";

export const infrastructureApi = {
  fetchInfrastructureNodes: () => apiFetch<ApiResponse<InfrastructureNode[]>>(InfrastructureUrlConfig.BACKEND_API.BASE, { dataSchema: z.any() }),
  fetchRedisTelemetry: () => apiFetch<ApiResponse<RedisTelemetry>>(InfrastructureUrlConfig.BACKEND_API.REDIS_TELEMETRY, { dataSchema: z.any() }),
  flushGlobalCache: () => apiFetch<ApiResponse<void>>(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, { method: 'POST',
      dataSchema: z.any()
}),
  flushTenantCache: (tenantIds: string[]) => apiFetch<ApiResponse<void>>(InfrastructureUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, { method: 'POST', body: JSON.stringify({ tenantIds }),
      dataSchema: z.any()
}),
};
