'use client';
/**
 * RESPONSIBILITY: React component SuperadminReportsMain owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTabTypes, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsDatePresetDropdownTypes, lucide-react, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsMain, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsDatePresetDropdown, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsExportButton
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Composes the Reports page view from hook-owned state, derived data, and feature actions. No direct API calls or business calculations.
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SuperadminReportsCancellationsTab } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsCancellationsTab';
import { SuperadminReportsDatePresetDropdown } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsDatePresetDropdown';
import { SuperadminReportsExportButton } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsExportButton';
import { SuperadminReportsHealthTab } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsHealthTab';
import { SuperadminReportsRevenueTab } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsRevenueTab';
import { SuperadminReportsSummaryCards } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsSummaryCards';
import { SUPERADMIN_REPORT_PLAN_OPTIONS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';
import { useSuperadminReportsMain } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsMain';

import type { DatePreset } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsDatePresetDropdownTypes';
import type { SuperadminReportsTab } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTabTypes';
import type { ChangeEvent } from 'react';



/**
 * @description Owns the SuperadminReportsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminReportsMain() {
  const t = useTranslations('superadmin_reports');
  const vm = useSuperadminReportsMain();
  if (vm.isPending) return <div className="space-y-4 p-8" aria-busy="true" data-testid="superadmin_reports-superadmin-reports-main-page"><div className="h-8 w-52 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-72 rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>;
  if (vm.isError) return <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-center"><p className="font-medium text-danger">{t('ui.reports_could_not_be_loaded_56a2a15d')}</p><button type="button" onClick={vm.retryAll} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_reports-superadmin-reports-main-superadmin-reports-main-retry">{t('ui.retry_6327b4e5')}</button></div>;
  return (<div className="space-y-6" data-testid="superadmin_reports-superadmin-reports-main-page-ready">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-2xl font-bold text-primary">{t('ui.reports_amp_exports_63fb7a20')}</h1><p className="mt-1 text-sm text-secondary">{t('ui.revenue_reports_tenant_cancellations_analysi_5769b3de')}</p></div><SuperadminReportsExportButton onExportCSV={vm.handleExportCSV} onExportPDF={vm.handleExportPDF} isExporting={vm.isExporting} data-testid="superadmin_reports-superadmin-reports-export-button-interactive-1"/></div>
    <SuperadminReportsSummaryCards totalMRR={vm.totalMRR} totalCancelledRevenue={vm.totalCancelledRevenue} cancellationsCount={vm.cancellationsData.length} avgHealthScore={vm.avgHealthScore} healthDataLength={vm.healthData.length} incomeChangePercent={vm.incomeChangePercent} dateSuffix={vm.datePreset.toLowerCase().replaceAll('_',' ')} />
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex flex-wrap items-center gap-3"><SuperadminReportsDatePresetDropdown value={vm.datePreset as DatePreset} onChange={vm.handlePresetChange} data-testid="superadmin_reports-main-date-preset-dropdown" /><input aria-label={t('ui.report_start_date_fd8ba7d4')} type="date" value={vm.dateFrom} max={vm.dateTo || undefined} onChange={vm.handleDateChange('startDate')} className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_reports-superadmin-reports-main-main-report-start-date"/><span className="text-sm text-secondary">{t('ui.to_01b6e203')}</span><input aria-label={t('ui.report_end_date_a98a1800')} type="date" value={vm.dateTo} min={vm.dateFrom || undefined} onChange={vm.handleDateChange('endDate')} className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_reports-superadmin-reports-main-main-report-end-date"/></div>{vm.tab!=='revenue'&&<div className="flex flex-wrap items-center gap-3"><div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/><input aria-label={t('ui.search_reports_by_gym_fe6c60bd')} value={vm.searchQuery} onChange={(event)=>vm.setSearch(event.target.value)} placeholder={t('ui.search_by_gym_name_ccb58215')} className="min-h-11 rounded-lg border border-border bg-input py-2 pl-10 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_reports-superadmin-reports-main-search-reports-by-gym"/></div><SearchableDropdown data-testid="superadmin_reports-superadmin-reports-main-plan-filter" value={vm.planFilter} onChange={(value)=>vm.setPlanFilter(String(value))} options={SUPERADMIN_REPORT_PLAN_OPTIONS.map(option=>({label:option.label,value:option.value}))}/></div>}</div>
    <div className="flex gap-2 border-b border-border">{(['revenue','cancellations','health'] as const).map((item: SuperadminReportsTab)=><button key={item} type="button" onClick={()=>vm.setTab(item)} aria-pressed={vm.tab===item} className={`min-h-11 border-b-2 px-4 py-2 text-sm font-medium capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${vm.tab===item?'border-focus text-primary':'border-transparent text-secondary'}`} data-testid="superadmin_reports-superadmin-reports-main-superadmin-reports-main-button">{item}</button>)}</div>
    {vm.tab==='revenue'?<SuperadminReportsRevenueTab revenueData={vm.revenueData}/>:vm.tab==='cancellations'?<SuperadminReportsCancellationsTab cancellationsData={vm.cancellationsData} filteredCancellationsData={vm.cancellationsData} totalCancelledRevenue={vm.totalCancelledRevenue} avgDaysActive={vm.avgDaysActive}/>:<SuperadminReportsHealthTab sortedHealthData={vm.healthData}/>}
  </div>);
}
