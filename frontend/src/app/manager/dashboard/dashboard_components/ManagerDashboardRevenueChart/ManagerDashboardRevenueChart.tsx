// RESPONSIBILITY: Renders the Manager DashboardRevenueChart presentation layer for the Manager module.
'use client';
import dynamic from 'next/dynamic';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';
import { formatKPI } from '@/lib/formatters';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardUrlState';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import type { DashboardRevenueChartData } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import { useLocale } from "next-intl";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });

export default function ManagerDashboardRevenueChart() {
    const locale = useLocale();
  const { range } = useManagerDashboardUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  
  if (!stats?.revenueChart || stats.revenueChart.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-border p-5 h-72 flex items-center justify-center">
        <p className="text-secondary text-sm">No revenue data available.</p>
      </div>
    );
  }

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['var(--chart-success)'],
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'solid',
      opacity: 0.22
    },
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const, y: { formatter: (v: number) => formatCurrency(v, ManagerEnvConfig.currencyCode, locale) } },
    xaxis: {
      categories: stats.revenueChart.map((d: DashboardRevenueChartData) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    dataLabels: { enabled: false } };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-5 flex flex-col h-full min-h-72">
      <h3 className="text-base font-bold text-primary mb-4">Revenue Trends</h3>
      <div className="flex-1 w-full h-56">
        <Chart
          type="area"
          height={220}
          options={options}
          series={[
            { name: 'Revenue', data: stats.revenueChart.map((d: DashboardRevenueChartData) => d.revenue || 0) },
          ]}
        />
      </div>
    </div>
  );
}
