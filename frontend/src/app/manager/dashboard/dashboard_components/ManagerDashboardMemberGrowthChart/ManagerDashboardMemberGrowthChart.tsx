'use client';
// RESPONSIBILITY: Renders the Manager DashboardMemberGrowthChart presentation layer for the Manager module.
import dynamic from 'next/dynamic';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/ManagerUseManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardUrlState';
import { formatKPI } from '@/lib/formatters';
import type { DashboardGrowthChartData } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });

export default function ManagerDashboardMemberGrowthChart() {
  const { range } = useManagerDashboardUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  
  if (!stats?.memberGrowth || stats.memberGrowth.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-border p-5 h-72 flex items-center justify-center">
        <p className="text-secondary text-sm">No member growth data available.</p>
      </div>
    );
  }

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['var(--chart-info)'],
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: stats.memberGrowth.map((d: DashboardGrowthChartData) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
    dataLabels: { enabled: false } };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-5 flex flex-col h-full min-h-72">
      <h3 className="text-base font-bold text-primary mb-4">Member Growth</h3>
      <div className="flex-1 w-full h-56">
        <Chart
          type="bar"
          height={220}
          options={options}
          series={[
            { name: 'New Members', data: stats.memberGrowth.map((d: DashboardGrowthChartData) => d.count || 0) },
          ]}
        />
      </div>
    </div>
  );
}
