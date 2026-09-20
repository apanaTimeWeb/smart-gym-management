'use client';
// RESPONSIBILITY: Renders the ManagerFinanceRevenueExpenseChart sub-view extracted from ManagerFinanceRevenueChart; owns only this presentation responsibility.
// RESPONSIBILITY: Renders the Manager FinanceRevenueChart presentation layer for the Manager module.
import dynamic from 'next/dynamic';
import { formatCurrencyFromMinorUnits, formatKPI } from '@/lib/formatters';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });

export function ManagerFinanceRevenueExpenseChart({ data }: { data: { month: string; revenue: number; expenses?: number }[] }) {
  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    colors: ['var(--chart-primary)'],
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: data.map(d => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    legend: { labels: { colors: 'var(--text-secondary)' } },
    dataLabels: { enabled: false } };
  
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-sm font-semibold text-primary mb-2">Revenue Trend</p>
      <Chart
        type="bar"
        height={280}
        options={options}
        series={[
          { name: 'Revenue',  data: data.map(d => d.revenue) },
        ]}
      />
    </div>
  );
}
