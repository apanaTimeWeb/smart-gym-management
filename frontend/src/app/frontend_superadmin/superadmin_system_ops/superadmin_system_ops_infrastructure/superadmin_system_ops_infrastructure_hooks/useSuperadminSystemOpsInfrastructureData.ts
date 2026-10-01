'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsInfrastructureData, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Infrastructure query state for nodes, Redis telemetry, and tenant selection data.
import { useMemo } from 'react';

import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_query_keys/SuperadminSystemOpsInfrastructureQueryKeys';
import { useQuery } from '@tanstack/react-query';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';

/**
 * Purpose: Centralizes all Infrastructure server reads outside UI components.
 * Inputs: node query parameters and whether tenant selection is needed.
 * Output: typed Query data, loading/error/refetch state.
 * Side effects: TanStack Query cache only.
 * Invariant: API response data is never moved into Zustand.
 
 * @description Centralizes all Infrastructure server reads outside UI components.
 * @dependencies node query parameters and whether tenant selection is needed.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsInfrastructureData(queryParams: Record<string, string>, includeTenants = false) {
  const normalizedParams = useMemo(() => queryParams, [queryParams]);
  const nodesQuery = useQuery({
    queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.nodes(normalizedParams),
    queryFn: () => infrastructureApi.fetchInfrastructureNodes(normalizedParams),
  });
  const redisQuery = useQuery({
    queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.redis,
    queryFn: () => infrastructureApi.fetchRedisTelemetry(),
  });
  const tenantsQuery = useQuery({
    queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.tenants,
    queryFn: () => infrastructureApi.fetchTenants(),
    enabled: includeTenants,
  });
  return { nodesQuery, redisQuery, tenantsQuery };
}
