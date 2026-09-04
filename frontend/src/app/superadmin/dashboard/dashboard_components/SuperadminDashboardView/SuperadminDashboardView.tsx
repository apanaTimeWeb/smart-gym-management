'use client';
// RESPONSIBILITY: SuperadminDashboardView.tsx renders the main SaaS metrics dashboard and charts. It receives data from the useSuperadminData hook.

import { Users, Building2, CreditCard, Activity } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useDashboardData } from '@/app/superadmin/dashboard/dashboard_utils/useDashboardData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
import type { SaaSDashboardMetrics, RevenueChartData, GrowthChartData, TimeRange } from '@/app/superadmin/dashboard/dashboard_types/dashboard_types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminDashboardView() {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const setCustomDateRange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };
  const { data, fetchState, error } = useDashboardData<{ metrics: SaaSDashboardMetrics, revenue: RevenueChartData[], growth: GrowthChartData[] }>(SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE);

  if (fetchState === 'loading') {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-border motion-safe:animate-pulse rounded"></div>
          <div className="h-4 w-96 bg-border motion-safe:animate-pulse rounded mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={`skeleton-${i}`} className="bg-background border border-border rounded-xl p-6 h-32 motion-safe:animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-background border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"></div>
          <div className="bg-background border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !data) return <div className="p-8 text-center text-danger font-medium">Error loading data.</div>;

  const { metrics: DUMMY_DASHBOARD_METRICS, revenue: REVENUE_CHART_DATA } = data;

  const timeMultiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;
  const mrrLabel = timeRange === 'weekly' ? 'WEEKLY RR' : timeRange === 'yearly' ? 'YEARLY RR' : timeRange === 'custom' ? 'CUSTOM RR' : 'TOTAL MRR';

  const metrics = [
    { label: mrrLabel, value: `₹${(Math.round((DUMMY_DASHBOARD_METRICS.monthlyRecurringRevenue || 0) * timeMultiplier)).toLocaleString('en-IN')}`, icon: CreditCard, color: 'text-success' },
    { label: 'TOTAL GYMS (TENANTS)', value: DUMMY_DASHBOARD_METRICS.totalGyms, icon: Building2, color: 'text-primary' },
    { label: 'ACTIVE GYMS', value: DUMMY_DASHBOARD_METRICS.activeGyms, icon: Activity, color: 'text-primary' },
    { label: 'TOTAL END USERS', value: (DUMMY_DASHBOARD_METRICS.totalEndUsers || 0).toLocaleString('en-IN'), icon: Users, color: 'text-purple' },
  ];

  const chartOptions = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: [CHART_COLORS.PRIMARY],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: {
      categories: REVENUE_CHART_DATA.map(d => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } }
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        formatter: (val: number) => `₹${(val / 1000)}k`
      }
    },
    grid: {
      borderColor: CHART_COLORS.BORDER,
      strokeDashArray: 4,
    },
    theme: { mode: 'dark' as const },
    tooltip: {
      theme: 'dark' as const
    }
  };

  const chartSeries = [{
    name: mrrLabel,
    data: REVENUE_CHART_DATA.map(d => Math.round(d.mrr * timeMultiplier))
  }];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              SaaS Overview
            </h1>
            <p className="text-secondary mt-1 text-sm">Monitor the health and growth of your Multi-Tenant SaaS platform.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {timeRange === 'custom' && (
              <div className="flex flex-wrap items-center gap-2 mr-2">
                <label className="text-sm font-medium text-secondary">From:</label>
                <input
                  type="date"
                  className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
                  value={startDate}
                  onChange={(e) => setCustomDateRange(e.target.value, endDate)}
                  aria-label="Start Date"
                />
                <label className="text-sm font-medium text-secondary ml-1">To:</label>
                <input
                  type="date"
                  className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
                  value={endDate}
                  onChange={(e) => setCustomDateRange(startDate, e.target.value)}
                  aria-label="End Date"
                />
              </div>
            )}
            <select 
              value={timeRange} 
              onChange={(e) => {
                setTimeRange(e.target.value as TimeRange);
                if (e.target.value !== 'custom') {
                  setCustomDateRange('', '');
                }
              }}
              className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-card border border-border rounded-xl p-6 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary font-medium text-xs uppercase tracking-wider">{m.label}</span>
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
            <div className="text-3xl font-bold text-foreground">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-6">{mrrLabel} Growth</h2>
          <div className="h-80 w-full">
            <Chart options={chartOptions} series={chartSeries} type="area" height="100%" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-6">Recent Onboards</h2>
          <div className="space-y-4">
            {DUMMY_DASHBOARD_METRICS.recentOnboards.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:bg-input motion-safe:transition-colors motion-safe:duration-200 cursor-default">
                <div>
                  <h3 className="text-sm font-semibold text-foreground truncate max-w-32" title={tenant.name}>{tenant.name}</h3>
                  <p className="text-xs text-secondary mt-1 truncate max-w-32" title={tenant.ownerName}>{tenant.ownerName}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                    ${
                      tenant.plan?.toUpperCase() === 'ENTERPRISE' ? 'bg-purple-bg text-purple border border-purple' : 
                      tenant.plan?.toUpperCase() === 'PRO' ? 'bg-primary-subtle text-primary border border-primary' : 
                      tenant.plan?.toUpperCase() === 'STARTER' || tenant.plan?.toUpperCase() === 'BASIC' ? 'bg-success-bg text-success border border-success' :
                      'bg-input text-secondary border border-border'
                    }
                  `}>
                    {tenant.plan?.toUpperCase() || 'UNKNOWN'}
                  </span>
                  <p className="text-xs text-disabled mt-2">{tenant.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
