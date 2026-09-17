// DATA FLOW: Superadmin UI → useSuperadminAnalyticsPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
// Exposes isLoading, isError. No JSX — pure logic.
//
// DATA FLOW: analyticsApi.fetchRevenueMetrics() → useSuperadminAnalyticsPage → SuperadminAnalyticsClient → UI
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/app/superadmin/analytics/superadmin_analytics_api/superadmin_analytics_api';
import type { RevenueMetrics, MonthlyAnalyticsDataPoint } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';
export type AnalyticsTimeRange = 'this_week' | 'this_month' | 'this_year' | 'custom';
interface UseAnalyticsPageReturn {
    metrics: RevenueMetrics | null;
    monthlyData: MonthlyAnalyticsDataPoint[];
    isLoading: boolean;
    isError: boolean;
    error: string | null;
    timeRange: string;
    customStart: string;
    customEnd: string;
}
export function useSuperadminAnalyticsPage(): UseAnalyticsPageReturn {
    const searchParams = useSearchParams();
    const timeRange = searchParams.get('range') || 'this_month';
    const customStart = searchParams.get('startDate') || '';
    const customEnd = searchParams.get('endDate') || '';
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['superadmin', 'analytics', timeRange, customStart, customEnd],
        queryFn: () => analyticsApi.fetchRevenueMetrics({ timeRange, customStart, customEnd }),
    });
    return {
        metrics: data?.data?.metrics || null,
        monthlyData: data?.data?.monthly || [],
        isLoading,
        isError,
        error: error ? error.message : null,
        timeRange,
        customStart,
        customEnd
    };
}
