'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminDashboardDateFilter consumers.
// RESPONSIBILITY: Custom hook managing the URL-backed state for the Dashboard date filter.
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { TimeRange } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

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
  useEffect(() => {
    if (value === 'custom') {
      setCustomStart(currentStartDate);
      setCustomEnd(currentEndDate);
    }
  }, [value, currentStartDate, currentEndDate]);

  const handleCustomDateChange = useCallback((type: 'start' | 'end', val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    
    if (type === 'start') {
      setCustomStart(val);
      if (val) params.set('startDate', val);
      else params.delete('startDate');
    } else {
      setCustomEnd(val);
      if (val) params.set('endDate', val);
      else params.delete('endDate');
    }
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const handlePresetChange = useCallback((preset: string) => {
    const today = new Date();
    let from = '';
    let to = '';

    switch (preset) {
      case 'this_month':
        from = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'last_month':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0] || '';
        break;
      case 'last_3_months':
        from = new Date(today.getFullYear(), today.getMonth() - 3, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'last_6_months':
        from = new Date(today.getFullYear(), today.getMonth() - 6, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'this_year':
        from = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0] || '';
        break;
      default:
        break;
    }

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


