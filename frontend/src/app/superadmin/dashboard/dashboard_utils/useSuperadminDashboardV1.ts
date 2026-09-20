// DATA FLOW: MSW/Backend → fetchDashboardBusinessOverview() → TanStack Query → Business Overview UI
// RESPONSIBILITY: Owns query orchestration for Business Overview. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardBusinessOverview } from '@/app/superadmin/dashboard/dashboard_api/SuperadminDashboardBusinessOverviewApi';
/**
 * Purpose: Owns query orchestration for Business Overview. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminDashboardV1() {
    return useQuery({ queryKey: ['superadmin', 'dashboard_business_overview'], queryFn: fetchDashboardBusinessOverview });
}
