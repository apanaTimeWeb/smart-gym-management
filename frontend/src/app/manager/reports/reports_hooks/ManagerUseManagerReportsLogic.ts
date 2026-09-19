'use client';
/** Coordinates the Manager / feature. */
import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reportsApi } from '@/app/manager/reports/reports_api/ManagerReportsApi';
import { useManagerReportsUiStore } from '@/app/manager/reports/reports_store/ManagerUseManagerReportsUiStore';

import type { ManagerReportsViewModel } from '@/app/manager/reports/reports_types/ManagerReportsViewModelTypes';


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
  const summaryQuery = useQuery({ queryKey: ['manager', 'reports', 'summary', dateRange], queryFn: async () => (await reportsApi.fetchSummary({ range: dateRange })).data ?? null });
  const exportMutation = useMutation({ mutationFn: () => reportsApi.exportReportsReport(ui.tab, { range: dateRange }), onSuccess: (blob) => { const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${ui.tab.toLowerCase()}_report_${new Date().toISOString().slice(0, 10)}.csv`; anchor.click(); URL.revokeObjectURL(url); } });
  const reload = useCallback(async () => { await queryClient.invalidateQueries({ queryKey: ['manager', 'reports', 'summary'] }); }, [queryClient]);
  return { tab: ui.tab, setTab: ui.setTab, dateRange, setDateRange, summary: summaryQuery.data ?? null, isPending: summaryQuery.isPending, isError: summaryQuery.isError, exporting: exportMutation.isPending, handleExportCSV: exportMutation.mutateAsync, reload };
}
