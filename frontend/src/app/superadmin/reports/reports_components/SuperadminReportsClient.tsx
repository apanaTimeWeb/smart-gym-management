// RESPONSIBILITY: Renders Reports from hook-owned server state and URL-owned filters. No direct API calls occur in this component.
'use client';
import type { ChangeEvent } from 'react';
import { formatDecimal } from '@/lib/formatters';
import type { SuperadminReportsTab } from '@/app/superadmin/reports/reports_types/SuperadminReportsTabTypes';
import { Search } from 'lucide-react';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import type { CancellationsRecord, TenantHealthScore, SuperadminReportsDateField } from '@/app/superadmin/reports/reports_types/SuperadminReportsTypes';
import { SUPERADMIN_REPORT_PLAN_OPTIONS } from '@/app/superadmin/reports/reports_utils/SuperadminReportsConstants';
import type { DatePreset } from '@/app/superadmin/reports/reports_types/SuperadminReportsDatePresetDropdownTypes';
import { useSuperadminReportsPage } from '@/app/superadmin/reports/reports_utils/useSuperadminReportsPage';
import { useUrlState } from '@/hooks/useUrlState';
import { SuperadminReportsDatePresetDropdown } from '@/app/superadmin/reports/reports_components/SuperadminReportsDatePresetDropdown';
import { SuperadminReportsExportButton } from '@/app/superadmin/reports/reports_components/SuperadminReportsExportButton';
import { SuperadminReportsSummaryCards } from '@/app/superadmin/reports/reports_components/SuperadminReportsSummaryCards';
import { SuperadminReportsRevenueTab } from '@/app/superadmin/reports/reports_components/SuperadminReportsRevenueTab';
import { SuperadminReportsCancellationsTab } from '@/app/superadmin/reports/reports_components/SuperadminReportsCancellationsTab';
import { SuperadminReportsHealthTab } from '@/app/superadmin/reports/reports_components/SuperadminReportsHealthTab';

export default function SuperadminReportsClient() {
  const { getParam, setParam } = useUrlState();
  const tab = (getParam('tab', 'revenue') === 'cancellations' || getParam('tab', 'revenue') === 'health' ? getParam('tab', 'revenue') : 'revenue') as SuperadminReportsTab;
  const datePreset = getParam('preset', 'THIS_MONTH');
  const dateFrom = getParam('startDate', '');
  const dateTo = getParam('endDate', '');
  const searchQuery = getParam('search', '');
  const planFilter = getParam('planFilter', 'ALL');
  const queryParams: Record<string,string> = { preset: datePreset };
  if (dateFrom) queryParams.startDate = dateFrom;
  if (dateTo) queryParams.endDate = dateTo;
  if (searchQuery) queryParams.search = searchQuery;
  if (planFilter !== 'ALL') queryParams.plan = planFilter;
  const { revenue, cancellations, health } = useSuperadminReportsPage(queryParams);
  const revenueData = revenue.data?.data ?? [];
  const cancellationsData: CancellationsRecord[] = cancellations.data?.data ?? [];
  const healthData: TenantHealthScore[] = health.data?.data ?? [];
  const isPending = revenue.isPending || cancellations.isPending || health.isPending;
  const isError = revenue.isError || cancellations.isError || health.isError;
  const handleDateChange = (key: SuperadminReportsDateField) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (key === 'startDate' && dateTo && value > dateTo) return;
    if (key === 'endDate' && dateFrom && value < dateFrom) return;
    setParam('preset', 'CUSTOM');
    setParam(key, value);
  };
  const handleExportCSV = () => {
    const headers: string[] = tab === 'revenue'
      ? ['Month', 'Monthly Income', 'New Revenue', 'Lost Income', 'Net Revenue', 'Gyms']
      : tab === 'cancellations'
        ? ['Gym', 'Owner', 'Plan', 'Left On', 'Reason', 'Lost Monthly Income', 'Days Active']
        : ['Gym', 'Plan', 'Score', 'Grade', 'Members', 'Last Login', 'Payment Health', 'Feature Usage', 'Tickets'];
    const rows = tab === 'revenue'
      ? revenueData.map((row) => [row.month, row.mrr, row.newRevenue, row.cancelledRevenue, row.netRevenue, row.tenantCount])
      : tab === 'cancellations'
        ? cancellationsData.map((row) => [row.gymName, row.ownerName, row.plan, row.cancelledAt, row.reason, row.mrr, row.daysActive])
        : healthData.map((row) => [row.gymName, row.plan, row.score, row.grade, row.memberCount, row.lastLogin, row.paymentHealth, row.featureUsage, row.supportTickets]);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"','""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `superadmin_${tab}_report.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  if (isPending) return <div className="space-y-4 p-8" aria-busy="true"><div className="h-8 w-52 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-72 rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>;
  if (isError) return <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-center"><p className="font-medium text-danger">Reports could not be loaded.</p><button type="button" onClick={() => { void revenue.refetch(); void cancellations.refetch(); void health.refetch(); }} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>;
  const totalMRR = revenueData.at(-1)?.mrr ?? 0;
  const totalCancelledRevenue = cancellationsData.reduce((sum,row)=>sum+row.mrr,0);
  const avgHealthScore = healthData.length ? Math.round(healthData.reduce((sum,row)=>sum+row.score,0)/healthData.length) : 0;
  const previousMRR = revenueData.length > 1 ? revenueData.at(-2)?.mrr ?? null : null;
  const incomeChangePercent = previousMRR && previousMRR !== 0 ? Number(formatDecimal(((totalMRR - previousMRR) / previousMRR) * 100, 1)) : null;
  return (<div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-2xl font-bold text-primary">Reports &amp; Exports</h1><p className="mt-1 text-sm text-secondary">Revenue reports, tenant cancellations analysis, and tenant health scores.</p></div><SuperadminReportsExportButton onExportCSV={handleExportCSV} onExportPDF={()=>window.print()} /></div>
    <SuperadminReportsSummaryCards totalMRR={totalMRR} totalCancelledRevenue={totalCancelledRevenue} cancellationsCount={cancellationsData.length} avgHealthScore={avgHealthScore} healthDataLength={healthData.length} incomeChangePercent={incomeChangePercent} dateSuffix={datePreset.toLowerCase().replaceAll('_',' ')} />
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex flex-wrap items-center gap-3"><SuperadminReportsDatePresetDropdown value={datePreset as DatePreset} onChange={(preset,from,to)=>{setParam('preset',preset);if(preset!=='CUSTOM'){setParam('startDate',from);setParam('endDate',to);}}}/><input aria-label="Report start date" type="date" value={dateFrom} max={dateTo || undefined} onChange={handleDateChange('startDate')} className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"/><span className="text-sm text-secondary">to</span><input aria-label="Report end date" type="date" value={dateTo} min={dateFrom || undefined} onChange={handleDateChange('endDate')} className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"/></div>{tab!=='revenue'&&<div className="flex flex-wrap items-center gap-3"><div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/><input aria-label="Search reports by gym" value={searchQuery} onChange={(event)=>setParam('search',event.target.value)} placeholder="Search by gym name..." className="min-h-11 rounded-lg border border-border bg-input py-2 pl-10 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"/></div><SearchableDropdown value={planFilter} onChange={(value)=>setParam('planFilter',String(value))} options={SUPERADMIN_REPORT_PLAN_OPTIONS.map(option=>({label:option.label,value:option.value}))}/></div>}</div>
    <div className="flex gap-2 border-b border-border">{(['revenue','cancellations','health'] as const).map(item=><button key={item} type="button" onClick={()=>setParam('tab',item)} aria-pressed={tab===item} className={`min-h-11 border-b-2 px-4 py-2 text-sm font-medium capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${tab===item?'border-primary text-primary':'border-transparent text-secondary'}`}>{item}</button>)}</div>
    {tab==='revenue'?<SuperadminReportsRevenueTab revenueData={revenueData}/>:tab==='cancellations'?<SuperadminReportsCancellationsTab cancellationsData={cancellationsData} filteredCancellationsData={cancellationsData} totalCancelledRevenue={totalCancelledRevenue} avgDaysActive={cancellationsData.length?Math.round(cancellationsData.reduce((sum,row)=>sum+row.daysActive,0)/cancellationsData.length):0}/>:<SuperadminReportsHealthTab sortedHealthData={healthData}/>}
  </div>);
}
