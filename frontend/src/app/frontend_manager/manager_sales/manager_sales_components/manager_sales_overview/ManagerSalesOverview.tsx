// RESPONSIBILITY: Renders ManagerSalesOverview's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { useManagerSalesLogic } from '@/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesLogic';
import { ManagerSalesFormatCurrency, ManagerSalesFormatKpi } from '@/app/frontend_manager/manager_sales/manager_sales_utils/ManagerSalesFormatters';
import type { OverviewDataPoint } from '@/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesTypes';


/**
 * @description Renders/orchestrates the ManagerSalesOverview user interface for the sales module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_sales/manager_sales_utils/ManagerSalesFormatters; @/app/frontend_manager/manager_infrastructure/ManagerEnvConfig; @/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesLogic; @/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" /> });

/** @description Renders the ManagerSalesOverview component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves loading state, error state. */
export default function ManagerSalesOverview() {
  const t = useTranslations('MANAGER_SALES');
  const locale = useLocale();

  const { overviewData, isPending, isError, errorMessage } = useManagerSalesLogic();

  if (isPending) {
    return <div className="space-y-5" aria-label={t("COPY_LOADING_SALES_OVERVIEW")}>
      <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </div>;
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-secondary">{t("COPY_RETRY_REQUEST_3")}</span>
      </div>
    );
  }

  const revenueOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', stacked: true },
    colors: ['var(--chart-primary)', 'var(--chart-success)'],
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const, y: { formatter: (v: number) => ManagerSalesFormatCurrency(v, ManagerEnvConfig.currencyCode, locale) } },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' }, formatter: (v: number) => ManagerSalesFormatKpi(v) } },
    legend: { labels: { colors: 'var(--text-secondary)' }, position: 'top' as const },
    dataLabels: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } } };

  const membersOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['var(--chart-danger)'],
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'solid',
      opacity: 0.22
    },
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } } },
    dataLabels: { enabled: false } };

  return (
    <div className="space-y-6">
      <div className="bg-card p-5 rounded-xl border border-border shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <h3 className="font-bold text-primary mb-4">{t("COPY_MONTHLY_REVENUE")}</h3>
        <Chart
          type="bar"
          height={280}
          options={revenueOptions}
          series={[
            { name: t("TEXT_SERIES_MEMBERSHIPS"), data: overviewData.map((d: OverviewDataPoint) => d.revenue || 0) },
            { name: t("TEXT_SERIES_STORE_POS"), data: overviewData.map((d: OverviewDataPoint) => d.storeRevenue || 0) },
          ]}
        />
      </div>

      <div className="bg-card p-5 rounded-xl border border-border shadow-card col-span-1 md:col-span-2 lg:col-span-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <h3 className="font-bold text-primary mb-4">{t("COPY_NEW_MEMBERS_TREND")}</h3>
        <Chart
          type="area"
          height={250}
          options={membersOptions}
          series={[
            { name: t("TEXT_SERIES_NEW_MEMBERS"), data: overviewData.map((d: OverviewDataPoint) => d.newMembers || 0) },
          ]}
        />
      </div>
    </div>
  );
}
