'use client';
// RESPONSIBILITY: Global Reports page — Revenue export (CSV/PDF), Churn analysis, Tenant health scores.
// All data imported from reports_constants. Pure view layer.
// DATA FLOW: reports_constants → SuperadminReportsClient → tabs + charts + tables

import { useState, useEffect } from 'react';
import { IndianRupee, TrendingDown, HeartPulse, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import type { RevenueRow, ChurnRecord, TenantHealthScore, ReportsTab } from '@/app/superadmin/reports/reports_types/reports_types';
import { superadminReportsApi } from '@/app/superadmin/reports/reports_api/superadmin_reports_api';

import { SuperadminReportsDatePresetDropdown, type DatePreset } from '@/app/superadmin/reports/reports_components/SuperadminReportsDatePresetDropdown';
import { SuperadminReportsExportButton } from '@/app/superadmin/reports/reports_components/SuperadminReportsExportButton';
import { SuperadminReportsSummaryCards } from './SuperadminReportsSummaryCards';
import { SuperadminReportsRevenueTab } from './SuperadminReportsRevenueTab';
import { SuperadminReportsChurnTab } from './SuperadminReportsChurnTab';
import { SuperadminReportsHealthTab } from './SuperadminReportsHealthTab';

const PLAN_OPTIONS = [
  { value: 'ALL', label: 'All Plans' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
  { value: 'PRO', label: 'Pro' },
  { value: 'STARTER', label: 'Starter' },
  { value: 'BASIC', label: 'Basic' },
];

export default function SuperadminReportsClient() {
  const [tab, setTab] = useState<ReportsTab>('revenue');
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
  
  const [datePreset, setDatePreset] = useState<DatePreset>('THIS_MONTH');
  const [dateFrom, setDateFrom] = useState(firstDay);
  const [dateTo, setDateTo] = useState(lastDay);
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('ALL');
  
  const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
  const [churnData, setChurnData] = useState<ChurnRecord[]>([]);
  const [healthData, setHealthData] = useState<TenantHealthScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [rev, churn, health] = await Promise.all([
          superadminReportsApi.fetchRevenueData(),
          superadminReportsApi.fetchChurnData(),
          superadminReportsApi.fetchHealthData()
        ]);
        if (mounted) {
          if (rev.success && rev.data) setRevenueData(rev.data as unknown as RevenueRow[]);
          if (churn.success && churn.data) setChurnData(churn.data as unknown as ChurnRecord[]);
          if (health.success && health.data) setHealthData(health.data as unknown as TenantHealthScore[]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

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
      toast.error('Start date cannot be after end date');
      return;
    }
    setDatePreset('CUSTOM');
    setDateFrom(val);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (dateFrom && val < dateFrom) {
      toast.error('End date cannot be before start date');
      return;
    }
    setDatePreset('CUSTOM');
    setDateTo(val);
  };

  function handleExportCSV() {
    let csvRows: string[] = [];
    if (tab === 'revenue') {
      csvRows = [
        ['Month', 'MRR', 'New Revenue', 'Churned', 'Net Revenue', 'Tenants'].join(','),
        ...revenueData.map(r => [r.month, r.mrr, r.newRevenue, r.churnedRevenue, r.netRevenue, r.tenantCount].join(','))
      ];
    } else if (tab === 'churn') {
      csvRows = [
        ['Tenant', 'Owner', 'Plan', 'Churned At', 'Reason', 'Lost MRR', 'Days Active'].join(','),
        ...churnData.map(c => [c.gymName, c.ownerName, c.plan, c.churnedAt, c.reason, c.mrr, c.daysActive].join(','))
      ];
    } else {
      csvRows = [
        ['Tenant', 'Plan', 'Score', 'Grade', 'Members', 'Last Login', 'Payment Health', 'Feature Usage', 'Tickets'].join(','),
        ...healthData.map(h => [h.gymName, h.plan, h.score, h.grade, h.memberCount, h.lastLogin, h.paymentHealth, h.featureUsage, h.supportTickets].join(','))
      ];
    }
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `superadmin_${tab}_report.csv`;
    a.click();
    toast.success('Report downloaded successfully');
  }

  function handleExportPDF() {
    window.print();
  }

  const lastRow = revenueData.length > 0 ? revenueData[revenueData.length - 1] : { mrr: 0 };
  const totalMRR = lastRow?.mrr || 0;
  const totalChurnedRevenue = churnData.reduce((s, c) => s + c.mrr, 0);
  const avgHealthScore = healthData.length > 0 ? Math.round(healthData.reduce((s, h) => s + h.score, 0) / healthData.length) : 0;

  const filteredChurnData = churnData.filter(c => {
    const matchSearch = c.gymName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlan = planFilter === 'ALL' || c.plan === planFilter;
    return matchSearch && matchPlan;
  });

  const avgDaysActive = filteredChurnData.length > 0 ? Math.round(
    filteredChurnData.reduce((s, c) => s + c.daysActive, 0) / filteredChurnData.length
  ) : 0;

  const filteredHealthData = healthData.filter(h => {
    const matchSearch = h.gymName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlan = planFilter === 'ALL' || h.plan === planFilter;
    return matchSearch && matchPlan;
  });

  const sortedHealthData = [...filteredHealthData].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Exports</h1>
          <p className="text-secondary mt-1 text-sm">Revenue reports, churn analysis, and tenant health scores.</p>
        </div>
        <SuperadminReportsExportButton onExportCSV={handleExportCSV} onExportPDF={handleExportPDF} />
      </div>

      <SuperadminReportsSummaryCards
        totalMRR={totalMRR}
        totalChurnedRevenue={totalChurnedRevenue}
        churnCount={churnData.length}
        avgHealthScore={avgHealthScore}
        healthDataLength={healthData.length}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <SuperadminReportsDatePresetDropdown 
            value={datePreset}
            onChange={handleDatePresetChange}
          />
          <input
            type="date"
            value={dateFrom}
            onChange={handleDateFromChange}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
          />
          <span className="text-secondary text-sm">to</span>
          <input
            type="date"
            value={dateTo}
            onChange={handleDateToChange}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {tab !== 'revenue' && (
          <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input
                type="text"
                placeholder="Search by gym name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div className="w-40 border-none bg-input rounded-lg">
              <SearchableDropdown
                options={PLAN_OPTIONS}
                value={planFilter}
                onChange={(val) => setPlanFilter(String(val))}
                className="bg-transparent border-border"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit flex-wrap">
        {([
          { key: 'revenue' as const, label: 'Revenue Report', icon: IndianRupee },
          { key: 'churn' as const, label: 'Churn Analysis', icon: TrendingDown },
          { key: 'health' as const, label: 'Tenant Health', icon: HeartPulse },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              tab === key ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'
            }`}
          >
            <Icon size={18} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {tab === 'revenue' && <SuperadminReportsRevenueTab revenueData={revenueData} />}
      {tab === 'churn' && <SuperadminReportsChurnTab churnData={churnData} filteredChurnData={filteredChurnData} totalChurnedRevenue={totalChurnedRevenue} avgDaysActive={avgDaysActive} />}
      {tab === 'health' && <SuperadminReportsHealthTab sortedHealthData={sortedHealthData} />}
    </div>
  );
}
