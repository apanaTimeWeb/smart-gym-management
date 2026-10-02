'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsInfrastructureData, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Infrastructure query state for nodes, Redis telemetry, and tenant selection data.
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';
import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureQueryKeys';



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
/**
 * @description Owns the useSuperadminSystemOpsInfrastructureData responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
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
