// DATA FLOW: Superadmin UI → useSuperadminDashboardDateRangeSuffix → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminDashboardDateRangeSuffix consumers.
// RESPONSIBILITY: Derives a human-readable date range suffix string from URL search params for KPI card labels.
import { useSearchParams } from 'next/navigation';
import { DASHBOARD_TIME_RANGE_LABELS } from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardConstants';
/**
 * Returns a formatted suffix string based on the current URL date range params.
 * e.g. " THIS MONTH" or " from 2024-01-01 to 2024-01-31"
 */
export function useSuperadminDashboardDateRangeSuffix(upperCase: boolean = true): string {
    const searchParams = useSearchParams();
    const range = searchParams.get('range') ?? 'this_month';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    let suffix = '';
    if (range === 'custom' && startDate && endDate) {
        suffix = `from ${startDate} to ${endDate}`;
    }
    else {
        suffix = DASHBOARD_TIME_RANGE_LABELS[range] ?? '';
    }
    if (!suffix)
        return '';
    return upperCase ? ` ${suffix.toUpperCase()}` : ` ${suffix}`;
}
