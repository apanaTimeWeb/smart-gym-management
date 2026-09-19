'use client';
// RESPONSIBILITY: Renders the ManagerReportsRevenueChart sub-view extracted from ManagerReportsCharts; owns only this presentation responsibility.
// RESPONSIBILITY: ApexCharts-based charts for each report tab — Revenue, Attendance, Members, Expenses.
import dynamic from 'next/dynamic';
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';
const CHART_BASE = {
  chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
  tooltip: { theme: 'dark' as const },
  xaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } } },
  legend: { labels: { colors: 'var(--text-secondary)' } } };

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => (
  <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" />
)});

export function ManagerReportsRevenueChart() {
  const { summary } = useManagerReportsLogic();
  const data = summary?.revenueData ?? [];

  const options = {
    ...CHART_BASE,
    chart: { ...CHART_BASE.chart, type: 'bar' as const, stacked: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    colors: ['var(--chart-primary)', 'var(--chart-danger)', 'var(--chart-success)'],
    xaxis: { ...CHART_BASE.xaxis, categories: data.map(d => d.month) },
    dataLabels: { enabled: false } };

  return (
    <Chart
      type="bar"
      height={300}
      options={options}
      series={[
        { name: 'Revenue',  data: data.map(d => d.revenue)  },
        { name: 'Expenses', data: data.map(d => d.expenses) },
        { name: 'Profit',   data: data.map(d => d.profit)   },
      ]}
    />
  );
}
