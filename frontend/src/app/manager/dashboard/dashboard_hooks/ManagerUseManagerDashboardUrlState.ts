'use client';
// RESPONSIBILITY: Owns dashboard URL state for range and custom date parameters; no server data is stored here.
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ManagerDashboardDateRange } from '@/app/manager/dashboard/dashboard_utils/ManagerDashboardDateFilterConstants';

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
