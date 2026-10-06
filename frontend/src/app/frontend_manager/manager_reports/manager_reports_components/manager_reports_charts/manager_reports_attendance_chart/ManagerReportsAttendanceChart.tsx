// RESPONSIBILITY: Renders ManagerReportsAttendanceChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';

/**
 * @description Renders/orchestrates the ManagerReportsAttendanceChart user interface for the reports module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const CHART_BASE = {
  chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
  tooltip: { theme: 'dark' as const },
  xaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } } },
  legend: { labels: { colors: 'var(--text-secondary)' } } };

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => (
  <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" />
)});

/** @description Renders the ManagerReportsAttendanceChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves loading state. */
export function ManagerReportsAttendanceChart() {
  const t = useTranslations('MANAGER_REPORTS');
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
        { name: t('COPY_PRESENT'), data: data.map(d => d.present) },
        { name: t('COPY_ABSENT'),  data: data.map(d => d.absent)  },
      ]}
    />
  );
}
