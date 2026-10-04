// RESPONSIBILITY: Renders/orchestrates SuperadminReportsRevenueTab within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders and composes SuperadminReportsRevenueTab for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import dynamic from 'next/dynamic';

import { useTranslations, useLocale } from 'next-intl';

import { CHART_COLORS } from '@/components/ui/ChartConstants';
import { formatKPI } from '@/lib/formatters';

import { formatCurrency as SuperadminReportsFormatCurrency } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_utils/SuperadminReportsFormatCurrency';

import type { SuperadminReportsRevenueTabProps } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTabTypes';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
/**
 * Responsibility: Renders the SuperadminReportsRevenueTab UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminReportsRevenueTab({ revenueData, currency = 'INR' }: SuperadminReportsRevenueTabProps) {
  const t = useTranslations('superadmin_reports');
    const locale = useLocale();

    const revenueChartOptions = {
        chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
        colors: [CHART_COLORS.PRIMARY, CHART_COLORS.DANGER],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.02, stops: [0, 90, 100] } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' as const, width: 2 },
        xaxis: {
            categories: revenueData.map((d) => d.month),
            axisBorder: { show: false }, axisTicks: { show: false },
            labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
        },
        yaxis: {
            labels: {
                style: { colors: CHART_COLORS.TEXT_SECONDARY },
                formatter: (v: number) => formatKPI(v),
            },
        },
        grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
        legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'top' as const, horizontalAlign: 'left' as const },
        theme: { mode: 'dark' as const },
        tooltip: { theme: 'dark' as const },
    };
    const revenueChartSeries = [
        { name: 'Monthly Income', data: revenueData.map((d) => d.mrr) },
        { name: 'Lost Income', data: revenueData.map((d) => d.cancelledRevenue) },
    ];
    return (<div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h2 className="text-base font-semibold text-primary mb-6">{t('ui.monthly_income_vs_lost_income_66e9d339')}</h2>
        <div className="h-72">
          <Chart options={revenueChartOptions} series={revenueChartSeries} type="area" height="100%"/>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input">
                {['Month', 'Monthly Income', 'New Revenue', 'Lost Income', 'Net Revenue', 'Gyms'].map((h) => (<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {revenueData.map((row) => (<tr key={row.month} className="hover:bg-input motion-safe:transition-colors">
                  <td className="px-4 py-3 font-medium text-primary">{row.month}</td>
                  <td className="px-4 py-3 text-primary">{SuperadminReportsFormatCurrency(row.mrr, currency, locale)}</td>
                  <td className="px-4 py-3 text-success">{t('ui.text_26b17225')}{SuperadminReportsFormatCurrency(row.newRevenue, currency, locale)}</td>
                  <td className="px-4 py-3 text-danger">{t('ui.text_336d5ebc')}{SuperadminReportsFormatCurrency(row.cancelledRevenue, currency, locale)}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{SuperadminReportsFormatCurrency(row.netRevenue, currency, locale)}</td>
                  <td className="px-4 py-3 text-secondary">{row.tenantCount}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}

