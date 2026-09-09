'use client';
// RESPONSIBILITY: SuperadminDashboardView.tsx renders the main SaaS metrics dashboard.
// Displays KPI cards with gold gradient, MRR area chart (ApexCharts), and recent onboards panel.
// Syncs time range filter to URL query params (Rule 41). No direct API calls — uses TanStack Query.
//
// DATA FLOW: superadminApi.dashboard.fetchDashboardData() → useQuery → SuperadminDashboardView → KPI + Chart JSX

import { Users, Building2, CreditCard, Activity, AlertCircle, Clock, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
import type {
  SaaSDashboardMetrics,
  RevenueChartData,
  GrowthChartData,
  TimeRange,
} from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * Type-safe shape of the dashboard API response data object.
 */
interface DashboardApiData {
  metrics: SaaSDashboardMetrics;
  revenue: RevenueChartData[];
  growth: GrowthChartData[];
}

/**
 * Formats a number to Indian currency string: ₹1,23,456
 */
function formatIndianCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function SuperadminDashboardView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Rule 41: Sync filter state to URL query params for shareable views
  const timeRangeFromUrl = (searchParams.get('range') as TimeRange) ?? 'monthly';
  const [timeRange, setTimeRange] = useState<TimeRange>(timeRangeFromUrl);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleTimeRangeChange = useCallback((newRange: TimeRange) => {
    setTimeRange(newRange);
    if (newRange !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', newRange);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'dashboard', timeRange, startDate, endDate],
    queryFn: () => {
      const params: Record<string, string> = { range: timeRange };
      if (timeRange === 'custom') {
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
      }
      return superadminApi.dashboard.fetchDashboardData(params);
    },
  });

  const fetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const apiData = fetchRes?.data as unknown as DashboardApiData | undefined;

  if (fetchState === 'loading') {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="h-4 w-96 bg-skeleton-base motion-safe:animate-pulse rounded mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={`kpi-skeleton-${i}`} className="bg-skeleton-base border border-border rounded-xl p-6 h-32 motion-safe:animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse" />
          <div className="bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !apiData) {
    return (
      <div className="p-8 text-center text-danger font-medium">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  const { metrics, revenue: revenueChartData, growth: growthChartData = [] } = apiData;

  const timeMultiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;
  const mrrLabel = timeRange === 'weekly' ? 'WEEKLY RR' : timeRange === 'yearly' ? 'YEARLY RR' : timeRange === 'custom' ? 'CUSTOM RR' : 'TOTAL MRR';

  const lastTwoMonths = revenueChartData.length >= 2 ? revenueChartData.slice(-2) : [];
  const mrrTrendNum = lastTwoMonths.length === 2 && lastTwoMonths[0]!.mrr > 0
    ? Math.round(((lastTwoMonths[1]!.mrr - lastTwoMonths[0]!.mrr) / lastTwoMonths[0]!.mrr) * 100)
    : 0;
  const mrrTrendStr = mrrTrendNum ? `${mrrTrendNum > 0 ? '+' : ''}${mrrTrendNum}% vs last month` : undefined;

  // Audit item #34: platformHealthScore from API — never hardcoded
  const healthScore = metrics.platformHealthScore;
  const healthDisplay = healthScore !== undefined ? `${healthScore}/100` : '—';

  const kpiCards = [
    {
      label: mrrLabel,
      value: formatIndianCurrency(Math.round((metrics.monthlyRecurringRevenue || 0) * timeMultiplier)),
      trend: metrics.mrrDeltaPercent !== undefined
        ? `${metrics.mrrDeltaPercent > 0 ? '+' : ''}${metrics.mrrDeltaPercent}% vs last month`
        : mrrTrendStr,
      trendUp: metrics.mrrDeltaPercent !== undefined ? metrics.mrrDeltaPercent >= 0 : mrrTrendNum >= 0,
      icon: CreditCard,
      colorClass: 'text-success',
      iconBgClass: 'bg-success/10',
    },
    {
      label: 'TOTAL GYMS (TENANTS)',
      value: String(metrics.totalGyms),
      trend: undefined,
      trendUp: true,
      icon: Building2,
      colorClass: 'text-primary',
      iconBgClass: 'bg-primary/10',
    },
    {
      label: 'ACTIVE GYMS',
      value: String(metrics.activeGyms),
      trend: undefined,
      trendUp: true,
      icon: Activity,
      colorClass: 'text-primary',
      iconBgClass: 'bg-primary/10',
    },
    {
      label: 'TOTAL END USERS',
      value: (metrics.totalEndUsers || 0).toLocaleString('en-IN'),
      trend: undefined,
      trendUp: true,
      icon: Users,
      colorClass: 'text-purple',
      iconBgClass: 'bg-purple/10',
    },
    {
      label: 'ARPU',
      value: formatIndianCurrency(metrics.arpu || 0),
      trend: undefined,
      trendUp: true,
      icon: DollarSign,
      colorClass: 'text-success',
      iconBgClass: 'bg-success/10',
    },
    {
      label: 'TRIAL GYMS',
      value: String(metrics.trialGyms || 0),
      trend: undefined,
      trendUp: true,
      icon: Clock,
      colorClass: 'text-warning',
      iconBgClass: 'bg-warning/10',
    },
    {
      label: 'OVERDUE INVOICES',
      value: String(metrics.overdueInvoicesCount || 0),
      trend: undefined,
      trendUp: false,
      icon: AlertCircle,
      colorClass: 'text-danger',
      iconBgClass: 'bg-danger/10',
    },
    {
      label: 'PENDING REVENUE',
      value: formatIndianCurrency(metrics.pendingRevenue || 0),
      trend: undefined,
      trendUp: true,
      icon: CreditCard,
      colorClass: 'text-warning',
      iconBgClass: 'bg-warning/10',
    },
    {
      label: 'PLATFORM HEALTH',
      // Audit item #34: value from API — never hardcoded
      value: healthDisplay,
      trend: undefined,
      trendUp: healthScore !== undefined ? healthScore >= 80 : true,
      icon: CheckCircle2,
      colorClass: healthScore !== undefined && healthScore < 80 ? 'text-warning' : 'text-success',
      iconBgClass: healthScore !== undefined && healthScore < 80 ? 'bg-warning/10' : 'bg-success/10',
    },
  ];

  const chartOptions = {
    chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
    colors: [CHART_COLORS.PRIMARY],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: {
      categories: revenueChartData.map((d: RevenueChartData) => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        formatter: (val: number) => `₹${(val / 1000).toFixed(1)}k`,
      },
    },
    grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const },
  };

  const chartSeries = [{
    name: mrrLabel,
    data: revenueChartData.map((d: RevenueChartData) => Math.round(d.mrr * timeMultiplier)),
  }];

  const growthChartOptions = {
    ...chartOptions,
    colors: [CHART_COLORS.INFO],
    xaxis: {
      ...chartOptions.xaxis,
      categories: growthChartData.map((d: GrowthChartData) => d.month),
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        formatter: (val: number) => val.toFixed(0),
      },
    },
  };

  const growthChartSeries = [{
    name: 'New Gyms',
    data: growthChartData.map((d: GrowthChartData) => d.gyms),
  }];

  const donutOptions = {
    chart: { type: 'donut' as const, background: 'transparent' },
    labels: (metrics.revenueByTier || []).map((t) => t.plan.toUpperCase()),
    colors: [CHART_COLORS.PRIMARY, CHART_COLORS.INFO, CHART_COLORS.WARNING, CHART_COLORS.SUCCESS, CHART_COLORS.DANGER],
    theme: { mode: 'dark' as const },
    stroke: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      theme: 'dark' as const,
      y: { formatter: (val: number) => `₹${val.toLocaleString('en-IN')}` },
    },
    legend: { position: 'bottom' as const, labels: { colors: CHART_COLORS.TEXT_SECONDARY } },
  };
  const donutSeries = (metrics.revenueByTier || []).map((t) => Math.round(t.amount * timeMultiplier));

  return (
    <div className="space-y-6">
      {/* Page Header + Time Range Filter */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SaaS Overview</h1>
          <p className="text-secondary mt-1 text-sm">
            Monitor the health and growth of your Multi-Tenant SaaS platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          {timeRange === 'custom' && (
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm font-medium text-secondary" htmlFor="dashboard-start-date">From:</label>
              <input
                id="dashboard-start-date"
                type="date"
                className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-label="Start Date"
              />
              <label className="text-sm font-medium text-secondary ml-1" htmlFor="dashboard-end-date">To:</label>
              <input
                id="dashboard-end-date"
                type="date"
                className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                aria-label="End Date"
              />
            </div>
          )}
          <select
            value={timeRange}
            aria-label="Select time range"
            onChange={(e) => handleTimeRangeChange(e.target.value as TimeRange)}
            className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 bg-gradient-to-b from-yellow-400/10 to-transparent"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-secondary font-medium text-xs uppercase tracking-wider">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg ${card.iconBgClass} flex items-center justify-center`}>
                  <Icon size={18} className={card.colorClass} />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
              {card.trend && (
                <p className={`text-xs mt-2 font-medium ${card.trendUp ? 'text-success' : 'text-danger'}`}>
                  {card.trendUp ? '↑' : '↓'} {card.trend}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Charts + Recent Onboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MRR Area Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-foreground">{mrrLabel} Growth</h2>
            {metrics.arrDeltaPercent !== undefined && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${metrics.arrDeltaPercent >= 0 ? 'bg-success-bg text-success border border-success/20' : 'bg-danger-bg text-danger border border-danger/20'}`}>
                ARR Trend: {metrics.arrDeltaPercent > 0 ? '+' : ''}{metrics.arrDeltaPercent}%
              </span>
            )}
          </div>
          <div className="h-80 w-full">
            <Chart options={chartOptions} series={chartSeries} type="area" height="100%" />
          </div>
        </div>

        {/* Recent Onboards */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-6">Recent Onboards</h2>
          <div className="space-y-4">
            {metrics.recentOnboards.map((tenant) => {
              const planUpper = tenant.plan?.toUpperCase() ?? 'UNKNOWN';
              const planClass =
                planUpper === 'ENTERPRISE' ? 'bg-purple-bg text-purple border border-purple' :
                planUpper === 'PRO' ? 'bg-primary-subtle text-primary border border-primary' :
                (planUpper === 'STARTER' || planUpper === 'BASIC') ? 'bg-success-bg text-success border border-success' :
                'bg-input text-secondary border border-border';
              return (
                <div
                  key={tenant.id}
                  onClick={() => router.push(`/superadmin/gyms?id=${tenant.id}`)}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:bg-input motion-safe:transition-colors motion-safe:duration-200 cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-foreground truncate" title={tenant.name}>{tenant.name}</h3>
                    <p className="text-xs text-secondary mt-1 truncate" title={tenant.ownerName}>{tenant.ownerName}</p>
                  </div>
                  <div className="ml-3 text-right flex flex-col items-end shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${planClass}`}>
                      {planUpper}
                    </span>
                    <p className="text-xs text-disabled mt-2">{tenant.createdAt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gym Growth Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm mt-6">
          <h2 className="text-base font-semibold text-foreground mb-6">Gym Growth (New Signups)</h2>
          <div className="h-80 w-full">
            <Chart options={growthChartOptions} series={growthChartSeries} type="bar" height="100%" />
          </div>
        </div>

        {/* Revenue by Plan Tier Donut Chart — audit item #35 */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-sm mt-6">
          <h2 className="text-base font-semibold text-foreground mb-6">Revenue by Plan</h2>
          <div className="h-80 w-full flex items-center justify-center">
            {(metrics.revenueByTier?.length || 0) > 0 ? (
              <Chart options={donutOptions} series={donutSeries} type="donut" height="100%" />
            ) : (
              <div className="text-secondary text-sm">No revenue data by tier</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
