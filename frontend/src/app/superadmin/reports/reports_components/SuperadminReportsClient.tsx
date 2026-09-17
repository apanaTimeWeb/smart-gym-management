// RESPONSIBILITY: Global Reports page — Revenue export (CSV/PDF), Cancellations analysis, Tenant health scores.
'use client';
// All data imported from reports_constants. Pure view layer.
// DATA FLOW: reports_constants → SuperadminReportsClient → tabs + charts + tables
import { useState, useEffect, useMemo } from 'react';
import { IndianRupee, TrendingDown, HeartPulse, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import type { RevenueRow, CancellationsRecord, TenantHealthScore, ReportsTab } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import { useQuery } from '@tanstack/react-query';
import { superadminReportsApi } from '@/app/superadmin/reports/reports_api/superadmin_reports_api';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
import { SuperadminReportsDatePresetDropdown, type DatePreset } from '@/app/superadmin/reports/reports_components/SuperadminReportsDatePresetDropdown';
import { SuperadminReportsExportButton } from '@/app/superadmin/reports/reports_components/SuperadminReportsExportButton';
import { SuperadminReportsSummaryCards } from '@/app/superadmin/reports/reports_components/SuperadminReportsSummaryCards';
import { SuperadminReportsRevenueTab } from '@/app/superadmin/reports/reports_components/SuperadminReportsRevenueTab';
import { SuperadminReportsCancellationsTab } from '@/app/superadmin/reports/reports_components/SuperadminReportsCancellationsTab';
import { SuperadminReportsHealthTab } from '@/app/superadmin/reports/reports_components/SuperadminReportsHealthTab';
const PLAN_OPTIONS = [
    { value: 'ALL', label: 'All Plans' },
    { value: 'ENTERPRISE', label: 'Enterprise' },
    { value: 'PRO', label: 'Pro' },
    { value: 'STARTER', label: 'Starter' },
    { value: 'BASIC', label: 'Basic' },
];
export default function SuperadminReportsClient() {
    const { getParam, setParam, setParams } = useSuperadminUrlState();
    const tab = (getParam('tab', 'revenue') as ReportsTab);
    const setTab = (t: string) => setParam('tab', t);
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
    const datePreset = (getParam('preset', 'THIS_MONTH') as DatePreset);
    const dateFrom = getParam('startDate', firstDay);
    const dateTo = getParam('endDate', lastDay);
    const searchQuery = getParam('search', '');
    const planFilter = getParam('planFilter', 'ALL');
    const setDatePreset = (p: string) => setParam('preset', p);
    const setDateFrom = (d: string) => setParam('startDate', d);
    const setDateTo = (d: string) => setParam('endDate', d);
    const setSearchQuery = (s: string) => setParam('search', s);
    const setPlanFilter = (p: string) => setParam('planFilter', p);
    const queryParams = useMemo(() => {
        const p: Record<string, string> = {};
        if (searchQuery)
            p.search = searchQuery;
        if (planFilter && planFilter !== 'ALL')
            p.planFilter = planFilter;
        if (dateFrom)
            p.startDate = dateFrom;
        if (dateTo)
            p.endDate = dateTo;
        return p;
    }, [searchQuery, planFilter, dateFrom, dateTo]);
    const { data: revRes, isLoading: revLoading, isError: revError } = useQuery({ queryKey: ['superadmin', 'reports', 'revenue', queryParams], queryFn: () => superadminReportsApi.fetchRevenueData(queryParams) });
    const { data: canRes, isLoading: canLoading, isError: canError } = useQuery({ queryKey: ['superadmin', 'reports', 'cancellations', queryParams], queryFn: () => superadminReportsApi.fetchCancellationsData(queryParams) });
    const { data: healthRes, isLoading: healthLoading, isError: healthError } = useQuery({ queryKey: ['superadmin', 'reports', 'health', queryParams], queryFn: () => superadminReportsApi.fetchHealthData(queryParams) });
    const revenueData = (revRes?.data as unknown as RevenueRow[]) || [];
    const cancellationsData = (canRes?.data as unknown as CancellationsRecord[]) || [];
    const healthData = (healthRes?.data as unknown as TenantHealthScore[]) || [];
    const handleDatePresetChange = (preset: DatePreset, from: string, to: string) => {
        setDatePreset(preset);
        if (preset !== 'CUSTOM') {
            setDateFrom(from);
            setDateTo(to);
        }
    };
    const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (dateTo && val > dateTo) {
            toast.error('Start date cannot be after end date', { id: 'start-date-cannot-be-after-end-date' });
            return;
        }
        setDatePreset('CUSTOM');
        setDateFrom(val);
    };
    const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (dateFrom && val < dateFrom) {
            toast.error('End date cannot be before start date', { id: 'end-date-cannot-be-before-start-date' });
            return;
        }
        setDatePreset('CUSTOM');
        setDateTo(val);
    };
    function handleExportCSV() {
        let csvRows: string[] = [];
        if (tab === 'revenue') {
            csvRows = [
                ['Month', 'Monthly Income', 'New Revenue', 'Lost Income', 'Net Revenue', 'Gyms'].join(','),
                ...revenueData.map(r => [r.month, r.mrr, r.newRevenue, r.cancelledRevenue, r.netRevenue, r.tenantCount].join(','))
            ];
        }
        else if (tab === 'cancellations') {
            csvRows = [
                ['Gym', 'Owner', 'Plan', 'Left On', 'Reason', 'Lost Monthly Income', 'Days Active'].join(','),
                ...cancellationsData.map(c => [c.gymName, c.ownerName, c.plan, c.cancelledAt, c.reason, c.mrr, c.daysActive].join(','))
            ];
        }
        else {
            csvRows = [
                ['Gym', 'Plan', 'Score', 'Grade', 'Members', 'Last Login', 'Payment Health', 'Feature Usage', 'Tickets'].join(','),
                ...healthData.map(h => [h.gymName, h.plan, h.score, h.grade, h.memberCount, h.lastLogin, h.paymentHealth, h.featureUsage, h.supportTickets].join(','))
            ];
        }
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `superadmin_${tab}_report.csv`;
        a.click();
        toast.success('Report downloaded successfully', { id: 'report-downloaded-successfully' });
    }
    function handleExportPDF() {
        window.print();
    }
    const lastRow = revenueData.length > 0 ? revenueData[revenueData.length - 1] : { mrr: 0 };
    const totalMRR = lastRow?.mrr || 0;
    const totalCancelledRevenue = cancellationsData.reduce((s, c) => s + c.mrr, 0);
    const avgHealthScore = healthData.length > 0 ? Math.round(healthData.reduce((s, h) => s + h.score, 0) / healthData.length) : 0;
    const dateSuffixMap: Record<string, string> = {
        'THIS_MONTH': 'this month',
        'LAST_MONTH': 'last month',
        'THIS_QUARTER': 'this quarter',
        'THIS_YEAR': 'this year',
        'LAST_YEAR': 'last year',
        'CUSTOM': `from ${dateFrom} to ${dateTo}`
    };
    const computedDateSuffix = dateSuffixMap[datePreset] || '';
    const avgDaysActive = cancellationsData.length > 0 ? Math.round(cancellationsData.reduce((s, c) => s + c.daysActive, 0) / cancellationsData.length) : 0;
    const sortedHealthData = [...healthData].sort((a, b) => b.score - a.score);
    const isLoading = revLoading || canLoading || healthLoading;
    const error = revError || canError || healthError;
    if (isLoading)
        return <div className="p-8 text-center text-secondary motion-safe:animate-pulse">Loading reports...</div>;
    if (error)
        return <div className="p-8 text-center text-danger">{error}</div>;
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Exports</h1>
          <p className="text-secondary mt-1 text-sm">Revenue reports, members lost analysis, and gym health scores.</p>
        </div>
        <SuperadminReportsExportButton onExportCSV={handleExportCSV} onExportPDF={handleExportPDF}/>
      </div>

      <SuperadminReportsSummaryCards totalMRR={totalMRR} totalCancelledRevenue={totalCancelledRevenue} cancellationsCount={cancellationsData.length} avgHealthScore={avgHealthScore} healthDataLength={healthData.length} dateSuffix={computedDateSuffix}/>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <SuperadminReportsDatePresetDropdown value={datePreset} onChange={handleDatePresetChange}/>
          <input type="date" value={dateFrom} onChange={handleDateFromChange} className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"/>
          <span className="text-secondary text-sm">to</span>
          <input type="date" value={dateTo} onChange={handleDateToChange} className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"/>
        </div>

        {tab !== 'revenue' && (<div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"/>
              <input type="text" placeholder="Search by gym name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"/>
            </div>
            <div className="w-40 border-none bg-input rounded-lg">
              <SearchableDropdown options={PLAN_OPTIONS} value={planFilter} onChange={(val) => setPlanFilter(String(val))} className="bg-transparent border-border"/>
            </div>
          </div>)}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit flex-wrap">
        {([
            { key: 'revenue' as const, label: 'Revenue Report', icon: IndianRupee },
            { key: 'cancellations' as const, label: 'Members Lost Analysis', icon: TrendingDown },
            { key: 'health' as const, label: 'Gym Health', icon: HeartPulse },
        ]).map(({ key, label, icon: Icon }) => (<button key={key} onClick={() => setTab(key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${tab === key ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}>
            <Icon size={18} strokeWidth={2}/> {label}
          </button>))}
      </div>

      {tab === 'revenue' && <SuperadminReportsRevenueTab revenueData={revenueData}/>}
      {tab === 'cancellations' && <SuperadminReportsCancellationsTab cancellationsData={cancellationsData} filteredCancellationsData={cancellationsData} totalCancelledRevenue={totalCancelledRevenue} avgDaysActive={avgDaysActive}/>}
      {tab === 'health' && <SuperadminReportsHealthTab sortedHealthData={sortedHealthData}/>}
    </div>);
}
