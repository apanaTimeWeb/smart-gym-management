'use client';// DATA FLOW: Superadmin UI → useSuperadminDashboardMain → Superadmin module API/state → consuming component
// DATA FLOW: URL search params → useSuperadminDashboardMain.ts → TanStack Query → SuperadminDashboardMain → Dashboard child components
// RESPONSIBILITY: Custom hook managing the data fetching for the Dashboard view using TanStack Query.
import { useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { superadminDashboardApi } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi';
import { SUPERADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardQueryKeys';

import type { TimeRange, SuperadminDashboardApiData } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';



/**
 * Purpose: Custom hook managing the data fetching for the Dashboard view using TanStack Query.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Custom hook managing the data fetching for the Dashboard view using TanStack Query.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminDashboardMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminDashboardMain() {
    const searchParams = useSearchParams();
    const timeRange = (searchParams.get('range') as TimeRange) ?? 'this_month';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const { data: fetchRes, isPending, isError } = useQuery({
        queryKey: SUPERADMIN_DASHBOARD_QUERY_KEYS.byRange(timeRange, startDate, endDate),
        queryFn: () => {
            const params: Record<string, string> = { range: timeRange };
            if (timeRange === 'custom') {
                if (startDate)
                    params.startDate = startDate;
                if (endDate)
                    params.endDate = endDate;
            }
            return superadminDashboardApi.fetchDashboard(params);
        },
    });
    const apiData = fetchRes?.data;
    return {
        isPending,
        isError,
        apiData,
        timeRange
    };
}
