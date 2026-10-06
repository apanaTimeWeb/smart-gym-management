// RESPONSIBILITY: Renders ManagerFinanceRevenueExpenseChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { ManagerFinanceFormatKpi } from '@/app/frontend_manager/manager_finance/manager_finance_utils/ManagerFinanceFormatters';

/**
 * @description Renders/orchestrates the ManagerFinanceRevenueExpenseChart user interface for the finance module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_finance/manager_finance_utils/ManagerFinanceFormatters
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" /> });

/** @description Renders the ManagerFinanceRevenueExpenseChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves loading state. */
export function ManagerFinanceRevenueExpenseChart({ data }: { data: { month: string; revenue: number; expenses?: number }[] }) {
  const t = useTranslations('MANAGER_FINANCE');

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    colors: ['var(--chart-primary)'],
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: data.map(d => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' }, formatter: (v: number) => ManagerFinanceFormatKpi(v) } },
    legend: { labels: { colors: 'var(--text-secondary)' } },
    dataLabels: { enabled: false } };
  
  return (
    <div className="bg-card border border-border rounded-xl p-5 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <p className="text-sm font-semibold text-primary mb-2">{t("COPY_REVENUE_TREND")}</p>
      <Chart
        type="bar"
        height={280}
        options={options}
        series={[
          { name: t('COPY_REVENUE'),  data: data.map(d => d.revenue) },
        ]}
      />
    </div>
  );
}
