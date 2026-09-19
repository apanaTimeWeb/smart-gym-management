'use client';
// RESPONSIBILITY: Renders the ManagerReportsExpensesChart sub-view extracted from ManagerReportsCharts; owns only this presentation responsibility.
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

export function ManagerReportsExpensesChart() {
  const { summary } = useManagerReportsLogic();
  const data = summary?.expenseBreakdown ?? [];

  const options = {
    ...CHART_BASE,
    chart: { ...CHART_BASE.chart, type: 'donut' as const },
    colors: ['var(--chart-danger)', 'var(--chart-warning)', 'var(--chart-info)', 'var(--chart-primary)', 'var(--chart-success)', 'var(--chart-secondary)'],
    labels: data.map(d => d.category),
    legend: { position: 'bottom' as const, labels: { colors: 'var(--text-secondary)' } },
    dataLabels: { style: { fontSize: '11px' } },
    plotOptions: { pie: { donut: { size: '65%' } } } };

  return (
    <Chart
      type="donut"
      height={320}
      options={options}
      series={data.map(d => d.amount)}
    />
  );
}
