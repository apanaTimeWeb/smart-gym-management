'use client';import { useMemo } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import { CHART_COLORS } from '@/components/ui/ChartConstants';

import { formatKPI } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_utils/SuperadminAnalyticsFormatters';
import { useSuperadminTheme } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutThemeProvider';

import type { MonthlyAnalyticsDataPoint } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes';



// DATA FLOW: API / URL state / module client state → useMemo → superadmin_analytics view components.
/**
 * Purpose: Builds theme-aware ApexCharts configuration and series from validated monthly analytics data.
 * Inputs: Monthly revenue and gym-growth data, active locale, and global Superadmin theme state.
 * Output: Stable chart options and series for the Revenue Analytics view.
 * Side effects: None; ApexCharts is rendered by the presentation component.
 * Invariant: Chart colors come from approved global chart tokens and theme mode follows the active shell theme.
 * Dependencies: Global chart token primitives, global theme infrastructure, active i18n locale.
 * Edge cases: Empty monthly data produces empty series without inventing records.
 */
/**
 * @description Derives chart-ready analytics series from validated API metrics and the active date range.
 * @dependencies Uses feature analytics types, locale-aware formatters, and semantic chart configuration.
 * @edge-case Preserves empty series and null metrics without fabricating data points.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminAnalyticsChartViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin analytics chart view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAnalyticsChartViewModel(monthlyData: MonthlyAnalyticsDataPoint[]) {
  const t = useTranslations('superadmin_analytics');
  const locale = useLocale();
  const { theme } = useSuperadminTheme();

  return useMemo(() => {
    const mrrAreaOptions = {
      chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
      colors: [CHART_COLORS.PRIMARY],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' as const, width: 2 },
      xaxis: {
        categories: monthlyData.map((point) => point.month),
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
      },
      yaxis: { labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => formatKPI(value) } },
      grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
      theme: { mode: theme },
      tooltip: { theme },
    };
    const tenantBarOptions = {
      chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' },
      colors: [CHART_COLORS.PRIMARY, CHART_COLORS.DANGER],
      plotOptions: { bar: { columnWidth: '55%', borderRadius: 3 } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: monthlyData.map((point) => point.month),
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
      },
      yaxis: { labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } } },
      grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
      legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'top' as const, horizontalAlign: 'left' as const },
      theme: { mode: theme },
      tooltip: { theme },
    };

    return {
      mrrAreaOptions,
      mrrAreaSeries: [{ name: t('ui.monthly_income'), data: monthlyData.map((point) => point.mrr) }],
      tenantBarOptions,
      tenantBarSeries: [
        { name: t('ui.active_superadmin_gyms_series'), data: monthlyData.map((point) => point.tenantCount) },
        { name: t('ui.members_lost_series'), data: monthlyData.map((point) => point.cancelledCount) },
      ],
      locale,
    };
  }, [locale, monthlyData, t, theme]);
}
