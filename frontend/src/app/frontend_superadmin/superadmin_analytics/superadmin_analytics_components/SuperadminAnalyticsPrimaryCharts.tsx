import type { SuperadminAnalyticsPrimaryChartsProps } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsPrimaryChartsTypes';

// RESPONSIBILITY: Renders the two primary analytics charts from the feature chart view-model.
'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import type { SuperadminAnalyticsChartViewModel } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsDashboardViewModelTypes';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


/**
 * @description Displays the revenue trend and gym-growth charts using precomputed feature options and series.
 * @dependencies Uses ApexCharts and the feature-owned chart view-model.
 * @edge-case Empty series remain empty; the chart component does not fabricate records.
 */
export function SuperadminAnalyticsPrimaryCharts({ charts }: SuperadminAnalyticsPrimaryChartsProps) {
  const t = useTranslations('superadmin_analytics');
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2" aria-label={t('ui.analytics_charts')}>
      <article className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-6 text-base font-semibold text-primary">{t('ui.monthly_income_growth_trend_f50c47f')}</h2>
        <div className="h-72">
          <Chart options={charts.mrrAreaOptions} series={charts.mrrAreaSeries} type="area" height="100%" />
        </div>
      </article>
      <article className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-6 text-base font-semibold text-primary">{t('ui.gym_growth_vs_members_lost_a78d866')}</h2>
        <div className="h-72">
          <Chart options={charts.tenantBarOptions} series={charts.tenantBarSeries} type="bar" height="100%" />
        </div>
      </article>
    </section>
  );
}
