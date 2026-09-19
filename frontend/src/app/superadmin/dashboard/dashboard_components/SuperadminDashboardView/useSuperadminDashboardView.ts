// DATA FLOW: Superadmin UI → useSuperadminDashboardView → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: URL search params → useSuperadminDashboardView.ts → TanStack Query → SuperadminDashboardView → Dashboard child components
// RESPONSIBILITY: Custom hook managing the data fetching for the Dashboard view using TanStack Query.
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { superadminDashboardApi } from '@/app/superadmin/dashboard/dashboard_api/SuperadminDashboardApi';
import type { TimeRange, SuperadminDashboardApiData } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardTypes';
/**
 * Purpose: Custom hook managing the data fetching for the Dashboard view using TanStack Query.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminDashboardView() {
    const searchParams = useSearchParams();
    const timeRange = (searchParams.get('range') as TimeRange) ?? 'this_month';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const { data: fetchRes, isPending, isError } = useQuery({
        queryKey: ['superadmin', 'dashboard', timeRange, startDate, endDate],
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
