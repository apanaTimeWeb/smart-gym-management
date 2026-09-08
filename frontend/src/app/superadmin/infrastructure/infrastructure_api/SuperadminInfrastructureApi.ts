// RESPONSIBILITY: Modularized API client for the Superadmin Infrastructure module.
// Covers server node health, Redis telemetry, and cache flush operations.
// DATA FLOW: SuperadminInfrastructureApi → superadmin_api.ts (re-exported) → UI hooks

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { InfrastructureNode, RedisTelemetry } from '@/app/superadmin/infrastructure/infrastructure_types/infrastructure_types';

/**
 * Fetches all infrastructure nodes with CPU, memory, and disk metrics.
 */
export function fetchInfrastructureNodes() {
  return apiFetch<ApiResponse<InfrastructureNode[]>>(SuperadminUrlConfig.BACKEND_API.INFRASTRUCTURE_BASE);
}

/**
 * Fetches Redis cache telemetry: memory usage, hit ratio, total keys, uptime.
 */
export function fetchRedisTelemetry() {
  return apiFetch<ApiResponse<RedisTelemetry>>(SuperadminUrlConfig.BACKEND_API.REDIS_TELEMETRY);
}

/**
 * Flushes the global Redis cache across ALL tenants. Irreversible — requires confirm dialog.
 */
export function flushGlobalCache() {
  return apiFetch<ApiResponse<void>>(SuperadminUrlConfig.BACKEND_API.REDIS_FLUSH_GLOBAL, { method: 'POST' });
}

/**
 * Flushes Redis cache for specific tenant IDs only.
 */
export function flushTenantCache(tenantIds: string[]) {
  return apiFetch<ApiResponse<void>>(SuperadminUrlConfig.BACKEND_API.REDIS_FLUSH_TENANT, {
    method: 'POST',
    body: JSON.stringify({ tenantIds }),
  });
}
