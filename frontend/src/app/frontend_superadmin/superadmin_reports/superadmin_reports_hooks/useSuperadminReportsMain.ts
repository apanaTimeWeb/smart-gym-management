'use client';// DATA FLOW: URL state → report page query hooks → derived presentation data → Main view; export uses feature mutation hook.
import { SUPERADMIN_REPORT_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';

// RESPONSIBILITY: Owns Reports route-level UI state, derived metrics, export lifecycle, and retry orchestration.
import { useUrlState } from '@/hooks/useUrlState';
import { formatDecimal } from '@/lib/formatters';

import { useSuperadminReportsExportMutation } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsExportMutation';
import { useSuperadminReportsPage } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsPage';

import type { SuperadminReportsTab } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTabTypes';
import type { SuperadminReportsDateField, CancellationsRecord, TenantHealthScore } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';
import type { ChangeEvent } from 'react';



/**
 * @description Coordinates report URL state, derived report presentation values, retry behavior, and export actions for the route.
 * @dependencies Composes feature query hooks, URL state, and the Reports export mutation.
 * @edge-case Invalid or missing URL values fall back to documented defaults instead of breaking report rendering.
 */
export function useSuperadminReportsMain() {
  const { getParam, setParam } = useUrlState();
  const tab = (getParam('tab', 'revenue') === 'cancellations' || getParam('tab', 'revenue') === 'health' ? getParam('tab', 'revenue') : 'revenue') as SuperadminReportsTab;
  const datePreset = getParam('preset', 'THIS_MONTH');
  const dateFrom = getParam('startDate', '');
  const dateTo = getParam('endDate', '');
  const searchQuery = getParam('search', '');
  const planFilter = getParam('planFilter', SUPERADMIN_REPORT_FILTER_ALL);
  const queryParams: Record<string, string> = { preset: datePreset };
  if (dateFrom) queryParams.startDate = dateFrom;
  if (dateTo) queryParams.endDate = dateTo;
  if (searchQuery) queryParams.search = searchQuery;
  if (planFilter !== SUPERADMIN_REPORT_FILTER_ALL) queryParams.plan = planFilter;
  const { revenue, cancellations, health } = useSuperadminReportsPage(queryParams);
  const { requestExport, isRequesting: isExporting } = useSuperadminReportsExportMutation();
  const revenueData = revenue.data?.data ?? [];
  const cancellationsData: CancellationsRecord[] = cancellations.data?.data ?? [];
  const healthData: TenantHealthScore[] = health.data?.data ?? [];
  const totalMRR = revenueData.at(-1)?.mrr ?? 0;
  const totalCancelledRevenue = cancellationsData.reduce((sum, row) => sum + row.mrr, 0);
  const avgHealthScore = healthData.length ? Math.round(healthData.reduce((sum, row) => sum + row.score, 0) / healthData.length) : 0;
  const previousMRR = revenueData.length > 1 ? revenueData.at(-2)?.mrr ?? null : null;
  const incomeChangePercent = previousMRR && previousMRR !== 0 ? Number(formatDecimal(((totalMRR - previousMRR) / previousMRR) * 100, 1)) : null;
  const avgDaysActive = cancellationsData.length ? Math.round(cancellationsData.reduce((sum, row) => sum + row.daysActive, 0) / cancellationsData.length) : 0;
  const handleDateChange = (key: SuperadminReportsDateField) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (key === 'startDate' && dateTo && value > dateTo) return;
    if (key === 'endDate' && dateFrom && value < dateFrom) return;
    setParam('preset', 'CUSTOM');
    setParam(key, value);
  };
  const handlePresetChange = (preset: string, from?: string, to?: string) => {
    setParam('preset', preset);
    if (preset !== 'CUSTOM') { setParam('startDate', from ?? ''); setParam('endDate', to ?? ''); }
  };
  return {
    tab, setTab: (value: SuperadminReportsTab) => setParam('tab', value), datePreset, dateFrom, dateTo, searchQuery, planFilter,
    setSearch: (value: string) => setParam('search', value), setPlanFilter: (value: string) => setParam('planFilter', value),
    handleDateChange, handlePresetChange, revenueData, cancellationsData, healthData, totalMRR, totalCancelledRevenue, avgHealthScore, incomeChangePercent, avgDaysActive,
    isPending: revenue.isPending || cancellations.isPending || health.isPending, isError: revenue.isError || cancellations.isError || health.isError, retryAll: () => { void revenue.refetch(); void cancellations.refetch(); void health.refetch(); },
    handleExportCSV: async () => { const response = await requestExport(); return response; }, handleExportPDF: () => window.print(), isExporting,
  };
}
