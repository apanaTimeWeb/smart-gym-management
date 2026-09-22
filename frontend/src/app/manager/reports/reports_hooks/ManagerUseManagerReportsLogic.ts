// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import React, { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { reportsApi } from '@/app/manager/reports/reports_api/ManagerReportsApi';
import { useManagerReportsUiStore } from '@/app/manager/reports/reports_store/ManagerUseManagerReportsUiStore';
import type { ManagerReportsViewModel } from '@/app/manager/reports/reports_types/ManagerReportsViewModelTypes';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
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
  const summaryQuery = useQuery({ queryKey: ['manager', 'reports', 'summary', dateRange], queryFn: async () => (await reportsApi.fetchReportsSummary({ range: dateRange })).data ?? null });

  const reload = useCallback(async () => { await queryClient.invalidateQueries({ queryKey: ['manager', 'reports', 'summary'] }); }, [queryClient]);
  return { tab: ui.tab, setTab: ui.setTab, dateRange, setDateRange, summary: summaryQuery.data ?? null, isPending: summaryQuery.isPending, isError: summaryQuery.isError, reload };
}
