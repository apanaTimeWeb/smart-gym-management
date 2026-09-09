'use client';
// RESPONSIBILITY: Renders the Revenue Analytics dashboard — KPI cards + ApexCharts area/bar charts.
// Pure view layer: consumes useAnalyticsPage hook. No data-fetching or business logic here.
//
// DATA FLOW: useAnalyticsPage → SuperadminAnalyticsClient → KPI Cards + Charts

import dynamic from 'next/dynamic';
import { TrendingUp, Users, IndianRupee, Activity, ArrowDownRight, DollarSign } from 'lucide-react';
import { useAnalyticsPage } from '@/app/superadmin/analytics/analytics_utils/useAnalyticsPage';
import type { AnalyticsTimeRange } from '@/app/superadmin/analytics/analytics_utils/useAnalyticsPage';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

const TIME_OPTIONS = [
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'this_year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

// Heavy chart component — code-split via dynamic import (Rule 15, Design §10)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminAnalyticsClient() {
  const { metrics, monthlyData, fetchState, timeRange, setTimeRange, customStart, setCustomStart, customEnd, setCustomEnd } = useAnalyticsPage();

  if (fetchState === 'loading') {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-64 bg-skeleton-base motion-safe:animate-pulse rounded mb-2" />
          <div className="h-4 w-96 bg-skeleton-base motion-safe:animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={`skeleton-${i}`} className="h-32 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
          <div className="h-80 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
        </div>
      </div>
    );
  }

  if (fetchState === 'error' || !metrics) {
    return (
      <div className="p-8 text-center text-danger font-medium">
        Failed to load analytics data. Please try again.
      </div>
    );
  }

  // Rule 18 fix: deltas come from API fields, not hardcoded strings
  const mrrDelta = metrics.mrrDeltaPercent !== undefined
    ? `${metrics.mrrDeltaPercent > 0 ? '+' : ''}${metrics.mrrDeltaPercent}% from last month`
    : undefined;

  const arrDelta = metrics.arrDeltaPercent !== undefined
    ? `${metrics.arrDeltaPercent > 0 ? '+' : ''}${metrics.arrDeltaPercent}% from last year`
    : undefined;

  const churnDelta = metrics.churnDeltaPercent !== undefined
    ? `${metrics.churnDeltaPercent > 0 ? '+' : ''}${metrics.churnDeltaPercent}% vs last month`
    : 'Target: < 2%';

  // ARPU computed from API fields (audit item #36)
  const arpu = metrics.arpu ?? (metrics.activeTenants > 0 ? Math.round(metrics.mrr / metrics.activeTenants) : 0);

  const kpiCards = [
    {
      label: 'MRR',
      value: `₹${metrics.mrr.toLocaleString('en-IN')}`,
      delta: mrrDelta,
      deltaUp: (metrics.mrrDeltaPercent ?? 0) >= 0,
      icon: IndianRupee,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      label: 'ARR',
      value: `₹${metrics.arr.toLocaleString('en-IN')}`,
      delta: arrDelta,
      deltaUp: (metrics.arrDeltaPercent ?? 0) >= 0,
      icon: TrendingUp,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      label: 'Churn Rate',
      value: `${metrics.churnRate}%`,
      delta: churnDelta,
      deltaUp: metrics.churnRate < 2,
      icon: ArrowDownRight,
      iconBg: 'bg-danger-bg',
      iconColor: 'text-danger',
    },
    {
      label: 'Active Tenants',
      value: String(metrics.activeTenants),
      delta: undefined,
      deltaUp: true,
      icon: Users,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      label: 'ARPU',
      // Design §21: Indian currency — ₹1,24,500
      value: `₹${arpu.toLocaleString('en-IN')}`,
      delta: 'Avg revenue per tenant',
      deltaUp: true,
      icon: DollarSign,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
  ];

  // Design §10: Area chart for MRR trend — gold line, green area fill
  const mrrAreaOptions = {
    chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
    colors: [CHART_COLORS.PRIMARY],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: {
      categories: monthlyData.map((d) => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        // Design §21: Indian currency formatting in Y-axis
        formatter: (val: number) => `₹${(val / 1000).toFixed(0)}k`,
      },
    },
    grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const },
  };

  const mrrAreaSeries = [{ name: 'MRR', data: monthlyData.map((d) => d.mrr) }];

  // Design §10: Grouped bar chart — new tenants (gold) vs churned (red)
  const tenantBarOptions = {
    chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' },
    colors: [CHART_COLORS.PRIMARY, CHART_COLORS.DANGER],
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 3 } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: monthlyData.map((d) => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
    },
    yaxis: { labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } } },
    grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
    legend: {
      labels: { colors: CHART_COLORS.TEXT_SECONDARY },
      position: 'top' as const,
      horizontalAlign: 'left' as const,
    },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const },
  };

  const tenantBarSeries = [
    { name: 'Active Tenants', data: monthlyData.map((d) => d.tenantCount) },
    { name: 'Churned', data: monthlyData.map((d) => d.churnedCount) },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header + Time Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Revenue Analytics</h1>
          <p className="text-secondary mt-1 text-sm">Global SaaS metrics and financial intelligence.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="w-48">
            <SearchableDropdown
              options={TIME_OPTIONS}
              value={timeRange}
              onChange={(val) => setTimeRange(String(val) as AnalyticsTimeRange)}
              className="bg-input border-border text-sm"
            />
          </div>
          {timeRange === 'custom' && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                aria-label="Start date"
                className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
              />
              <span className="text-secondary text-sm">to</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                aria-label="End date"
                className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards — Design §5a: gold gradient, icon, trend line */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-card border border-border p-6 rounded-xl shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 bg-gradient-to-b from-yellow-400/10 to-transparent"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-secondary font-medium text-xs uppercase tracking-wider">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <Icon size={18} className={card.iconColor} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{card.value}</p>
              {card.delta && (
                <p className={`text-xs mt-2 font-medium ${card.deltaUp ? 'text-success' : 'text-secondary'}`}>
                  {card.deltaUp ? '↑' : '↓'} {card.delta}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Charts Row — Design §10: ApexCharts area + bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-6">MRR Growth Trend</h2>
          <div className="h-72">
            <Chart options={mrrAreaOptions} series={mrrAreaSeries} type="area" height="100%" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-6">Tenant Growth vs Churn</h2>
          <div className="h-72">
            <Chart options={tenantBarOptions} series={tenantBarSeries} type="bar" height="100%" />
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity size={18} className="text-primary" />
            </div>
            <span className="text-secondary text-xs font-medium uppercase tracking-wider">LTV (Lifetime Value)</span>
          </div>
          <p className="text-3xl font-bold text-foreground mt-3">₹{metrics.ltv.toLocaleString('en-IN')}</p>
          <p className="text-xs text-success mt-2 font-medium">↑ Per tenant average</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <IndianRupee size={18} className="text-warning" />
            </div>
            <span className="text-secondary text-xs font-medium uppercase tracking-wider">CAC (Customer Acquisition Cost)</span>
          </div>
          <p className="text-3xl font-bold text-foreground mt-3">₹{metrics.cac.toLocaleString('en-IN')}</p>
          <p className="text-xs text-secondary mt-2">LTV:CAC = {(metrics.ltv / metrics.cac).toFixed(1)}x</p>
        </div>
      </div>
    </div>
  );
}
