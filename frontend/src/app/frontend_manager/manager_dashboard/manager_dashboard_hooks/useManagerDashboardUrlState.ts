'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ManagerDashboardDateRange } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_constants/ManagerDashboardDateFilterConstants';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates dashboard feature state and its documented UI/API boundary through useManagerDashboardUrlState.
 * @dependencies Uses ManagerDashboardDateFilterConstants.
 * @edge-case preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerDashboardUrlState owns the dashboard feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerDashboardUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const range = (searchParams.get('range') as ManagerDashboardDateRange | null) ?? 'monthly';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setRange = useCallback((value: ManagerDashboardDateRange) => updateUrl({ range: value, startDate: value === 'custom' ? startDate || null : null, endDate: value === 'custom' ? endDate || null : null }), [endDate, startDate, updateUrl]);
  const setCustomDateRange = useCallback((start: string, end: string) => updateUrl({ range: 'custom', startDate: start || null, endDate: end || null }), [updateUrl]);

  return { range, startDate, endDate, setRange, setCustomDateRange };
}
