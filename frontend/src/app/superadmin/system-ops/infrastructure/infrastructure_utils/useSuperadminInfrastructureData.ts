// RESPONSIBILITY: Owns Infrastructure query state for nodes, Redis telemetry, and tenant selection data.
'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { infrastructureApi } from '@/app/superadmin/system-ops/infrastructure/infrastructure_api/SuperadminInfrastructureApi';
/**
 * Purpose: Centralizes all Infrastructure server reads outside UI components.
 * Inputs: node query parameters and whether tenant selection is needed.
 * Output: typed Query data, loading/error/refetch state.
 * Side effects: TanStack Query cache only.
 * Invariant: API response data is never moved into Zustand.
 */
export function useSuperadminInfrastructureData(queryParams: Record<string, string>, includeTenants = false) {
  const normalizedParams = useMemo(() => queryParams, [queryParams]);
  const nodesQuery = useQuery({
    queryKey: ['superadmin', 'infrastructure', 'nodes', normalizedParams],
    queryFn: () => infrastructureApi.fetchInfrastructureNodes(normalizedParams),
  });
  const redisQuery = useQuery({
    queryKey: ['superadmin', 'infrastructure', 'redis'],
    queryFn: () => infrastructureApi.fetchRedisTelemetry(),
  });
  const tenantsQuery = useQuery({
    queryKey: ['superadmin', 'infrastructure', 'tenants'],
    queryFn: () => infrastructureApi.fetchTenants(),
    enabled: includeTenants,
  });
  return { nodesQuery, redisQuery, tenantsQuery };
}
