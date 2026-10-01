'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsInfrastructureUptime, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns TanStack Query access to historical Superadmin platform uptime points.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_query_keys/SuperadminSystemOpsInfrastructureQueryKeys';
import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';

/**
 * Purpose: load the historical uptime series used by SuperadminSystemOpsInfrastructureUptimeChart.
 * Inputs: none; the API defines the fixed 24-hour series.
 * Output: query state for uptime points.
 * Side effects: network/cache activity only.
 * Invariant: the chart renders only validated API data and never fabricates values in JSX.
 
 * @description load the historical uptime series used by SuperadminSystemOpsInfrastructureUptimeChart.
 * @dependencies none; the API defines the fixed 24-hour series.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsInfrastructureUptime() {
  return useQuery({
    queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.uptimeHistory,
    queryFn: () => infrastructureApi.fetchUptimeHistory(),
  });
}
