'use client';
// DATA FLOW: Superadmin UI → useSuperadminDashboardDateFilter → Superadmin module API/state → consuming component
// DATA FLOW: feature API/schema → hook/context → useSuperadminDashboardDateFilter consumers.
// RESPONSIBILITY: Custom hook managing the URL-backed state for the Dashboard date filter.
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { getSuperadminDashboardPresetRange } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_utils/SuperadminDashboardDateRangeUtils';

import type { SuperadminDashboardCustomDateField } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardDateFilterTypes';
import type { TimeRange } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';

/**
 * Purpose: Custom hook managing the URL-backed state for the Dashboard date filter.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Custom hook managing the URL-backed state for the Dashboard date filter.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminDashboardDateFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const value = (searchParams.get('range') as TimeRange) ?? 'this_month';
    const currentStartDate = searchParams.get('startDate') || '';
    const currentEndDate = searchParams.get('endDate') || '';
    const [customStart, setCustomStart] = useState(currentStartDate);
    const [customEnd, setCustomEnd] = useState(currentEndDate);
    // RESPONSIBILITY: Handle side-effects for useSuperadminDashboardDateFilter
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (value === 'custom') {
            setCustomStart(currentStartDate);
            setCustomEnd(currentEndDate);
        }
    }, [value, currentStartDate, currentEndDate]);
    const handleCustomDateChange = useCallback((type: SuperadminDashboardCustomDateField, val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', 'custom');
        if (type === 'start') {
            setCustomStart(val);
            if (val)
                params.set('startDate', val);
            else
                params.delete('startDate');
        }
        else {
            setCustomEnd(val);
            if (val)
                params.set('endDate', val);
            else
                params.delete('endDate');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    const handlePresetChange = useCallback((preset: string) => {
        const { from, to } = getSuperadminDashboardPresetRange(preset);
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', preset);
        if (preset !== 'custom' && preset !== 'monthly' && preset !== 'yearly') {
            params.set('startDate', from);
            params.set('endDate', to);
        } else if (preset !== 'custom') {
            params.delete('startDate');
            params.delete('endDate');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    return {
        value,
        customStart,
        customEnd,
        handlePresetChange,
        handleCustomDateChange
    };
}
