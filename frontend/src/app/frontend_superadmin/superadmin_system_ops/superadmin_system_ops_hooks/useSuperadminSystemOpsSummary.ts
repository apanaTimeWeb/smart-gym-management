'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsSummary, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns TanStack Query server state for the System Ops summary feature.
import { useQuery } from '@tanstack/react-query';

import { fetchSuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_api/SuperadminSystemOpsApi';
import { SUPERADMIN_SYSTEM_OPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_constants/SuperadminSystemOpsQueryKeys';



/**
 * Purpose: Loads the System Ops dashboard summary from the feature API contract.
 * Data flow: API → TanStack Query → SuperadminSystemOpsMain.
 * Invariant: no backend state is stored in Zustand or Context.
 
 * @description Loads the System Ops dashboard summary from the feature API contract.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsSummary() {
  return useQuery({
    queryKey: SUPERADMIN_SYSTEM_OPS_QUERY_KEYS.summary,
    queryFn: fetchSuperadminSystemOpsSummary,
  });
}
