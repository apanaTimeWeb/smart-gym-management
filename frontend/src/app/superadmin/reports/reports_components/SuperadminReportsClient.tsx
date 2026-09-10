'use client';
// RESPONSIBILITY: Global Reports page — Revenue export (CSV/PDF), Churn analysis, Tenant health scores.
// All data imported from reports_constants. Pure view layer.
// DATA FLOW: reports_constants → SuperadminReportsClient → tabs + charts + tables

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Download, TrendingDown, HeartPulse, IndianRupee,
  AlertTriangle, CheckCircle2, XCircle, Search, Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import type { RevenueRow, ChurnRecord, TenantHealthScore, ReportsTab } from '@/app/superadmin/reports/reports_types/reports_types';

const PLAN_OPTIONS = [
  { value: 'ALL', label: 'All Plans' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
  { value: 'PRO', label: 'Pro' },
  { value: 'STARTER', label: 'Starter' },
  { value: 'BASIC', label: 'Basic' },
];
import {
  GRADE_STYLES,
  PAYMENT_HEALTH_STYLES,
  TICKET_DANGER_THRESHOLD,
  TICKET_WARNING_THRESHOLD,
  KPI_CARD_GRADIENT,
} from '@/app/superadmin/reports/reports_types/reports_constants';
import { superadminReportsApi } from '@/app/superadmin/reports/reports_api/superadmin_reports_api';

import { SuperadminReportsDatePresetDropdown, type DatePreset } from '@/app/superadmin/reports/reports_components/SuperadminReportsDatePresetDropdown';
import { SuperadminReportsExportButton } from '@/app/superadmin/reports/reports_components/SuperadminReportsExportButton';

// Heavy chart — code-split via dynamic import (Rule 15, Design §10)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Tab = ReportsTab;

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

  const revenueChartOptions = {
    chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
    colors: [CHART_COLORS.PRIMARY, CHART_COLORS.DANGER],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.02, stops: [0, 90, 100] } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: {
      categories: revenueData.map((d) => d.month),
      axisBorder: { show: false }, axisTicks: { show: false },
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        formatter: (v: number) => `₹${(v / 1000).toFixed(0)}k`,
      },
    },
    grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
    legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'top' as const, horizontalAlign: 'left' as const },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const },
  };

  const revenueChartSeries = [
    { name: 'MRR', data: revenueData.map((d) => d.mrr) },
    { name: 'Churned Revenue', data: revenueData.map((d) => d.churnedRevenue) },
  ];

  const churnReasonCounts = churnData.reduce<Record<string, number>>((acc, c) => {
    acc[c.reason] = (acc[c.reason] ?? 0) + 1;
    return acc;
  }, {});

  const churnPieOptions = {
    chart: { type: 'donut' as const, background: 'transparent' },
    colors: [CHART_COLORS.DANGER, CHART_COLORS.WARNING, CHART_COLORS.PRIMARY, CHART_COLORS.INFO, CHART_COLORS.SUCCESS],
    labels: Object.keys(churnReasonCounts),
    legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'bottom' as const },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const },
    dataLabels: { style: { colors: ['#fff'] } },
  };

  const churnPieSeries = Object.values(churnReasonCounts);

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

  function renderTicketCount(count: number) {
    const color =
      count > TICKET_DANGER_THRESHOLD
        ? 'text-danger'
        : count > TICKET_WARNING_THRESHOLD
        ? 'text-warning'
        : 'text-secondary';
    return <span className={`text-xs font-medium ${color}`}>{count}</span>;
  }

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

      {/* Summary KPIs — Design §5a: gold gradient on all cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
          style={{ background: KPI_CARD_GRADIENT }}
        >
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee size={18} strokeWidth={2} className="text-primary" />
            <span className="text-xs text-secondary uppercase tracking-wider">Current MRR</span>
          </div>
          <p className="text-3xl font-bold text-foreground">₹{totalMRR.toLocaleString('en-IN')}</p>
          <p className="text-xs text-success mt-1">↑ +8.6% from last month</p>
        </div>
        <div
          className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
          style={{ background: KPI_CARD_GRADIENT }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={18} strokeWidth={2} className="text-danger" />
            <span className="text-xs text-secondary uppercase tracking-wider">Churned Revenue (MTD)</span>
          </div>
          <p className="text-3xl font-bold text-foreground">₹{totalChurnedRevenue.toLocaleString('en-IN')}</p>
          <p className="text-xs text-danger mt-1">{churnData.length} tenants churned</p>
        </div>
        <div
          className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
          style={{ background: KPI_CARD_GRADIENT }}
        >
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse size={18} strokeWidth={2} className="text-success" />
            <span className="text-xs text-secondary uppercase tracking-wider">Avg Health Score</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{avgHealthScore}/100</p>
          <p className="text-xs text-secondary mt-1">Across {healthData.length} active tenants</p>
        </div>
      </div>

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

      {/* Revenue Report Tab */}
      {tab === 'revenue' && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-foreground mb-6">MRR vs Churned Revenue</h2>
            <div className="h-72">
              <Chart options={revenueChartOptions} series={revenueChartSeries} type="area" height="100%" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-input/40">
                    {['Month', 'MRR', 'New Revenue', 'Churned', 'Net Revenue', 'Tenants'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {revenueData.map((row: RevenueRow) => (
                    <tr key={row.month} className="hover:bg-input/30 motion-safe:transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{row.month}</td>
                      <td className="px-4 py-3 text-foreground">₹{row.mrr.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-success">+₹{row.newRevenue.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-danger">-₹{row.churnedRevenue.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">₹{row.netRevenue.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-secondary">{row.tenantCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Churn Analysis Tab */}
      {tab === 'churn' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground mb-6">Churn Reasons Breakdown</h2>
              <div className="h-64">
                <Chart options={churnPieOptions} series={churnPieSeries} type="donut" height="100%" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-3">
              <h2 className="text-base font-semibold text-foreground mb-2">Churn Summary</h2>
              <div className="flex justify-between text-sm"><span className="text-secondary">Filtered Churned Tenants</span><span className="text-foreground font-medium">{filteredChurnData.length}</span></div>
              <div className="flex justify-between text-sm"><span className="text-secondary">Total Lost MRR</span><span className="text-danger font-medium">₹{totalChurnedRevenue.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-sm"><span className="text-secondary">Avg Days Active Before Churn</span><span className="text-foreground font-medium">{avgDaysActive} days</span></div>
              <div className="flex justify-between text-sm"><span className="text-secondary">Top Churn Reason</span><span className="text-foreground font-medium">Too expensive</span></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-input/40">
                    {['Tenant', 'Plan', 'Churned At', 'Reason', 'Lost MRR', 'Days Active'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredChurnData.map((row: ChurnRecord) => (
                    <tr key={row.id} className="hover:bg-input/30 motion-safe:transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{row.gymName}</p>
                        <p className="text-xs text-secondary">{row.ownerName}</p>
                      </td>
                      <td className="px-4 py-3 text-secondary">{row.plan}</td>
                      <td className="px-4 py-3 text-secondary">{row.churnedAt}</td>
                      <td className="px-4 py-3 text-secondary">{row.reason}</td>
                      <td className="px-4 py-3 text-danger font-medium">₹{row.mrr.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-secondary">{row.daysActive}d</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tenant Health Tab */}
      {tab === 'health' && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-input/40">
                  {['Tenant', 'Plan', 'Score', 'Grade', 'Members', 'Last Login', 'Payment', 'Feature Use', 'Tickets'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedHealthData.map((row: TenantHealthScore) => (
                  <tr key={row.id} className="hover:bg-input/30 motion-safe:transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{row.gymName}</td>
                    <td className="px-4 py-3 text-secondary text-xs">{row.plan}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-input rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${row.score >= 80 ? 'bg-success' : row.score >= 60 ? 'bg-primary' : row.score >= 40 ? 'bg-warning' : 'bg-danger'}`}
                            style={{ width: `${row.score}%` }}
                          />
                        </div>
                        <span className="text-foreground font-medium text-xs">{row.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${GRADE_STYLES[row.grade]}`}>
                        {row.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-secondary">{row.memberCount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-secondary text-xs">{row.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-1 text-xs font-medium ${PAYMENT_HEALTH_STYLES[row.paymentHealth]}`}>
                        {row.paymentHealth === 'GOOD' && <CheckCircle2 size={18} strokeWidth={2} />}
                        {row.paymentHealth === 'AT_RISK' && <AlertTriangle size={18} strokeWidth={2} />}
                        {row.paymentHealth === 'OVERDUE' && <XCircle size={18} strokeWidth={2} />}
                        {row.paymentHealth}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-secondary">{row.featureUsage}%</td>
                    <td className="px-4 py-3">{renderTicketCount(row.supportTickets)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
