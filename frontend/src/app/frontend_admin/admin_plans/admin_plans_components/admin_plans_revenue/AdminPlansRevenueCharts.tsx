"use client";
// RESPONSIBILITY: Renders the revenue distribution donut chart for Plans.
import { useLocale, useTranslations } from 'next-intl';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansFormatCurrency';

import dynamic from 'next/dynamic';
import type { PlanRevenueRecord } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';
import type { AdminPlansRevenueChartsProps } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueChartsPropsTypes';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * AdminPlansRevenueCharts renders the admin plans revenue charts UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPlansRevenueCharts: Renders the revenue distribution donut chart for Plans.
 * @dependencies Consumes AdminPlansFormatCurrency, AdminPlansRevenueTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPlansRevenueCharts({ data }: AdminPlansRevenueChartsProps) {
  const locale = useLocale();
  const t = useTranslations();

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      background: 'transparent',
    },
    labels: data.map((d) => d.planName),
    dataLabels: { enabled: false },
    stroke: { show: false },
    theme: { mode: 'dark' }, // Fallback to theme handling if needed
    legend: { position: 'right' },
    tooltip: {
      y: {
        formatter: (val) => AdminPlansFormatCurrency(val, undefined, locale),
      },
    },
  };

  const chartSeries = data.map((d) => d.totalRevenue);

  if (data.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
        {t('plans.AdminPlansRevenueCharts.text_3be612e2eb')}</h3>
      <div className="h-64 w-full flex justify-center">
        <Chart options={chartOptions} series={chartSeries} type="donut" height="100%" />
      </div>
    </div>
  );
}
