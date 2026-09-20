// DATA FLOW: Inputs enter useSuperadminSystemOpsSummary, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns TanStack Query server state for the System Ops summary feature.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchSuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_api/SuperadminSystemOpsApi';

export const SUPERADMIN_SYSTEM_OPS_SUMMARY_QUERY_KEY = ['superadmin', 'system-ops', 'summary'] as const;

/**
 * Purpose: Loads the System Ops dashboard summary from the feature API contract.
 * Data flow: API → TanStack Query → SuperadminSystemOpsDashboardClient.
 * Invariant: no backend state is stored in Zustand or Context.
 */
export function useSuperadminSystemOpsSummary() {
  return useQuery({
    queryKey: SUPERADMIN_SYSTEM_OPS_SUMMARY_QUERY_KEY,
    queryFn: fetchSuperadminSystemOpsSummary,
  });
}
