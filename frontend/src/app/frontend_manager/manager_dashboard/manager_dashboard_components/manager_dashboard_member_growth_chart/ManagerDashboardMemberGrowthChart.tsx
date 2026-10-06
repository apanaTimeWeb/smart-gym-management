// RESPONSIBILITY: Renders ManagerDashboardMemberGrowthChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardUrlState';
import { ManagerDashboardFormatKpi } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_utils/ManagerDashboardFormatters';
import type { DashboardGrowthChartData } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_types/ManagerDashboardTypes';


/**
 * @description Renders/orchestrates the ManagerDashboardMemberGrowthChart user interface for the dashboard module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_dashboard/manager_dashboard_utils/ManagerDashboardFormatters; @/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardQueries; @/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardUrlState; @/app/frontend_manager/manager_dashboard/manager_dashboard_types/ManagerDashboardTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" /> });

/** @description Renders the ManagerDashboardMemberGrowthChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerDashboardMemberGrowthChart() {
  const t = useTranslations('MANAGER_DASHBOARD');

  const { range } = useManagerDashboardUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  
  if (!stats?.memberGrowth || stats.memberGrowth.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-border p-5 h-72 flex items-center justify-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-secondary text-sm">{t("COPY_NO_MEMBER_GROWTH_DATA_AVAILABLE")}</p>
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
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' }, formatter: (v: number) => ManagerDashboardFormatKpi(v) } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
    dataLabels: { enabled: false } };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-5 flex flex-col h-full min-h-72 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <h3 className="text-base font-bold text-primary mb-4">{t("COPY_MEMBER_GROWTH")}</h3>
      <div className="flex-1 w-full h-56">
        <Chart
          type="bar"
          height={220}
          options={options}
          series={[
            { name: t("TEXT_SERIES_NEW_MEMBERS"), data: stats.memberGrowth.map((d: DashboardGrowthChartData) => d.count || 0) },
          ]}
        />
      </div>
    </div>
  );
}
