'use client';// DATA FLOW: Superadmin UI → useSuperadminAnalyticsPage → Superadmin module API/state → consuming component
// RESPONSIBILITY: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
// Exposes isPending, isError. No JSX — pure logic.
//
// DATA FLOW: analyticsApi.fetchRevenueMetrics() → useSuperadminAnalyticsPage → SuperadminAnalyticsMain → UI
import { useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { analyticsApi } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_api/SuperadminAnalyticsApi';
import { SUPERADMIN_ANALYTICS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_constants/SuperadminAnalyticsQueryKeys';

import type { SuperadminAnalyticsPageReturn, SuperadminAnalyticsTimeRange } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsPageTypes';
import type { RevenueMetrics, MonthlyAnalyticsDataPoint } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes';



/**
 * Purpose: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminAnalyticsPage responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminAnalyticsPage(): SuperadminAnalyticsPageReturn {
    const t = useTranslations('superadmin_analytics');
    const searchParams = useSearchParams();
    const timeRange = (searchParams.get('range') ?? 'this_month') as SuperadminAnalyticsTimeRange;
    const customStart = searchParams.get('startDate') || '';
    const customEnd = searchParams.get('endDate') || '';
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: SUPERADMIN_ANALYTICS_QUERY_KEYS.byRange(timeRange, customStart, customEnd),
        queryFn: () => analyticsApi.fetchRevenueMetrics({ timeRange, customStart, customEnd }),
    });
    return {
        metrics: data?.data?.metrics || null,
        monthlyData: data?.data?.monthly || [],
        isPending,
        isError,
        error: isError ? t('ui.failed_to_load_view_9169dbe') : null,
        timeRange,
        customStart,
        customEnd,
        refetch
    };
}
