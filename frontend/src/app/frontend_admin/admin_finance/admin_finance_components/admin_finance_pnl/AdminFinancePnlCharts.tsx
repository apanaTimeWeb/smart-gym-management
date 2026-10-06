"use client";
// RESPONSIBILITY: Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch)
import { useLocale, useTranslations } from 'next-intl';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatCurrency';
import { formatKPI } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatters';
// and donut (profit share by branch). Code-split via next/dynamic to avoid SSR issues.

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';

// Lazy-load ApexCharts to prevent SSR window-is-not-defined error (Rule 15 — Lazy Loading)
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

import type { AdminFinancePnlChartsProps } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinancePnlChartsPropsTypes';


const CHART_FONT = 'Inter, system-ui, sans-serif';

/**
 * AdminFinancePnlCharts renders the admin finance pnl charts UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePnlCharts: Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch)
 * @dependencies Consumes AdminFinanceFormatCurrency, AdminFinanceFormatters, AdminLayoutChartThemeTokens, AdminFinanceTypes, AdminFinancePnlChartsPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePnlCharts({ data }: AdminFinancePnlChartsProps) {
  const locale = useLocale();
  const t = useTranslations();

  if (data.length === 0) return null;

  const branchNames = data.map((b) => b.branchName.split(' ').slice(0, 2).join(' '));
  const revenues    = data.map((b) => Math.round(b.revenue / 1000));    // in K
  const expenses    = data.map((b) => Math.round(b.expenses / 1000));   // in K
  const profits     = data.filter((b) => b.netProfit > 0).map((b) => b.netProfit);
  const profitLabels = data.filter((b) => b.netProfit > 0).map((b) => b.branchName.split(' ').slice(0, 2).join(' '));

  const barOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: CHART_FONT,
    },
    plotOptions: {
      bar: { columnWidth: '55%', borderRadius: 4 },
    },
    colors: [ADMIN_CHART_THEME.success, ADMIN_CHART_THEME.danger],
    dataLabels: { enabled: false },
    xaxis: {
      categories: branchNames,
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '11px' },
        rotate: -20,
      },
      axisBorder: { color: ADMIN_CHART_THEME.border },
      axisTicks: { color: ADMIN_CHART_THEME.border },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '11px' },
        formatter: (val: number) => formatKPI(val * 1000, locale),
      },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
      fontSize: '12px',
      fontFamily: CHART_FONT,
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => formatKPI(val * 1000, locale) },
    },
  };

  const barSeries = [
    { name: t('finance.AdminFinancePnlCharts.series_revenue'), data: revenues },
    { name: t('finance.AdminFinancePnlCharts.series_expenses'), data: expenses },
  ];

  const donutOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: CHART_FONT,
    },
    colors: [ADMIN_CHART_THEME.primary, ADMIN_CHART_THEME.success, ADMIN_CHART_THEME.info, ADMIN_CHART_THEME.warning, ADMIN_CHART_THEME.warning],
    labels: profitLabels,
    dataLabels: {
      enabled: true,
      style: { colors: [ADMIN_CHART_THEME.textPrimary], fontSize: '11px', fontWeight: 600 },
      dropShadow: { enabled: false },
    },
    legend: {
      position: 'bottom',
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
      fontSize: '12px',
      fontFamily: CHART_FONT,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: t('finance.AdminAuditRepair.totalProfit'),
              color: ADMIN_CHART_THEME.textSecondary,
              fontSize: '12px',
              fontFamily: CHART_FONT,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return total >= 100000 ? formatKPI(total, locale) : AdminFinanceFormatCurrency(total, undefined, locale);
              },
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) =>
          AdminFinanceFormatCurrency(val, undefined, locale),
      },
    },
    stroke: { colors: ['transparent'] },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Grouped Bar Chart — Revenue vs Expenses */}
      <div className="xl:col-span-3 bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-primary mb-4">{t('finance.AdminFinancePnlCharts.text_c7ebaca60f')}</p>
        <ReactApexChart
          type="bar"
          series={barSeries}
          options={barOptions}
          height={280}
        />
      </div>

      {/* Donut — Profit Share */}
      <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-primary mb-4">{t('finance.AdminFinancePnlCharts.text_f2fc0d3c2b')}</p>
        {profits.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-sm text-secondary">
            {t('finance.AdminFinancePnlCharts.text_7c2d057fd5')}</div>
        ) : (
          <ReactApexChart
            type="donut"
            series={profits}
            options={donutOptions}
            height={280}
          />
        )}
      </div>
    </div>
  );
}