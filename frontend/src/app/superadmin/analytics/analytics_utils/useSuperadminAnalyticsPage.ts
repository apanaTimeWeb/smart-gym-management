// DATA FLOW: Superadmin UI → useSuperadminAnalyticsPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
// Exposes isPending, isError. No JSX — pure logic.
//
// DATA FLOW: analyticsApi.fetchRevenueMetrics() → useSuperadminAnalyticsPage → SuperadminAnalyticsClient → UI
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/app/superadmin/analytics/analytics_api/SuperadminAnalyticsApi';
import type { RevenueMetrics, MonthlyAnalyticsDataPoint } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsTypes';
import type { SuperadminAnalyticsPageReturn, SuperadminAnalyticsTimeRange } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsPageTypes';
/**
 * Purpose: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminAnalyticsPage(): SuperadminAnalyticsPageReturn {
    const searchParams = useSearchParams();
    const timeRange = (searchParams.get('range') ?? 'this_month') as SuperadminAnalyticsTimeRange;
    const customStart = searchParams.get('startDate') || '';
    const customEnd = searchParams.get('endDate') || '';
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['superadmin', 'analytics', timeRange, customStart, customEnd],
        queryFn: () => analyticsApi.fetchRevenueMetrics({ timeRange, customStart, customEnd }),
    });
    return {
        metrics: data?.data?.metrics || null,
        monthlyData: data?.data?.monthly || [],
        isPending,
        isError,
        error: error ? error.message : null,
        timeRange,
        customStart,
        customEnd
    };
}
