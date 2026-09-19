// RESPONSIBILITY: Owns TanStack Query access to historical Superadmin platform uptime points.
'use client';
import { useQuery } from '@tanstack/react-query';
import { infrastructureApi } from '@/app/superadmin/system-ops/infrastructure/infrastructure_api/SuperadminInfrastructureApi';
/**
 * Purpose: load the historical uptime series used by SuperadminUptimeChart.
 * Inputs: none; the API defines the fixed 24-hour series.
 * Output: query state for uptime points.
 * Side effects: network/cache activity only.
 * Invariant: the chart renders only validated API data and never fabricates values in JSX.
 */
export function useSuperadminInfrastructureUptime() {
  return useQuery({
    queryKey: ['superadmin', 'infrastructure', 'uptime-history'],
    queryFn: () => infrastructureApi.fetchUptimeHistory(),
  });
}
