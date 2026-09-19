'use client';
// RESPONSIBILITY: Renders the ManagerReportsAttendanceChart sub-view extracted from ManagerReportsCharts; owns only this presentation responsibility.
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

export function ManagerReportsAttendanceChart() {
  const { summary } = useManagerReportsLogic();
  const data = (summary?.attendanceData ?? []).slice(-14);

  const options = {
    ...CHART_BASE,
    chart: { ...CHART_BASE.chart, type: 'area' as const },
    colors: ['var(--chart-success)', 'var(--chart-danger)'],
    fill: { type: 'solid', opacity: 0.22 },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: { ...CHART_BASE.xaxis, categories: data.map(d => d.date) },
    dataLabels: { enabled: false } };

  return (
    <Chart
      type="area"
      height={300}
      options={options}
      series={[
        { name: 'Present', data: data.map(d => d.present) },
        { name: 'Absent',  data: data.map(d => d.absent)  },
      ]}
    />
  );
}
