// DATA FLOW: MSW/Backend → fetchDashboardBusinessOverview() → TanStack Query → Business Overview UI
// RESPONSIBILITY: Owns query orchestration for Business Overview. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_query_keys/SuperadminDashboardQueryKeys';
import { fetchDashboardBusinessOverview } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi';

/**
 * Purpose: Owns query orchestration for Business Overview. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns query orchestration for Business Overview. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminDashboardV1() {
    return useQuery({ queryKey: SUPERADMIN_DASHBOARD_QUERY_KEYS.businessOverview, queryFn: fetchDashboardBusinessOverview });
}
