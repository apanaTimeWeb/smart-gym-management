// RESPONSIBILITY: Orchestrates Manager Reports URL/tab state and summary query state; no synchronous export/download flow exists for the Manager role.
'use client';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useManagerReportsUiStore } from '@/app/frontend_manager/manager_reports/manager_reports_store/useManagerReportsUiStore';
import { ManagerReportsQueryKeys } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsQueryKeys';
import { useManagerReportsSummaryQuery } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsSummaryQuery';
import type { ManagerReportsViewModel } from '@/app/frontend_manager/manager_reports/manager_reports_types/ManagerReportsViewModelTypes';

/**
 * @description Coordinates Manager Reports summary state, URL-backed date range, tab selection, and targeted reload behavior.
 * @dependencies Uses only Manager Reports UI/query state plus TanStack Query and Next.js navigation infrastructure.
 * @edge-case Preserves the active range in the URL and invalidates only the Manager Reports query namespace when retrying.
 */
export function useManagerReportsLogic(): ManagerReportsViewModel {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const ui = useManagerReportsUiStore();
  const dateRange = searchParams.get('range') || 'this_month';
  const setDateRange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'this_month') params.set('range', value); else params.delete('range');
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);
  const summaryQuery = useManagerReportsSummaryQuery(dateRange);
  const reload = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ManagerReportsQueryKeys.all });
  }, [queryClient]);
  return {
    tab: ui.tab,
    setTab: ui.setTab,
    dateRange,
    setDateRange,
    summary: summaryQuery.data ?? null,
    isPending: summaryQuery.isPending,
    isError: summaryQuery.isError,
    reload,
  };
}
