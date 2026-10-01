'use client';
// RESPONSIBILITY: Orchestrates the analytics page sections and route-level loading/error states; owns no business calculations or API calls.
import { useTranslations } from 'next-intl';

import { SuperadminAnalyticsKpiGrid } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsKpiGrid';
import { SuperadminAnalyticsMainErrorState } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsMainErrorState';
import { SuperadminAnalyticsMainLoadingState } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsMainLoadingState';
import { SuperadminAnalyticsPageHeader } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsPageHeader';
import { SuperadminAnalyticsPrimaryCharts } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsPrimaryCharts';
import { SuperadminAnalyticsSecondaryMetrics } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsSecondaryMetrics';
import { useSuperadminAnalyticsDashboardViewModel } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsDashboardViewModel';
import { useSuperadminAnalyticsPage } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsPage';

/**
 * @description Composes analytics header, KPI, chart, and secondary metric sections.
 * @dependencies Uses only the feature analytics query hook, dashboard view-model, and feature-owned child components.
 * @edge-case Delegates loading and error recovery to dedicated feature components so the route never renders a blank failure state.
 */
export default function SuperadminAnalyticsMain() {
  const t = useTranslations('superadmin_analytics');
  const { metrics, monthlyData, isPending, isError, refetch } = useSuperadminAnalyticsPage();
  const viewModel = useSuperadminAnalyticsDashboardViewModel(metrics, monthlyData);

  if (isPending) return <SuperadminAnalyticsMainLoadingState />;
  if (isError || !metrics) return <SuperadminAnalyticsMainErrorState onRetry={() => void refetch()} message={t('ui.action_failed_retry')} />;

  return (
    <div className="space-y-6">
      <SuperadminAnalyticsPageHeader />
      <SuperadminAnalyticsKpiGrid cards={viewModel.kpiCards} />
      <SuperadminAnalyticsPrimaryCharts charts={viewModel.charts} />
      <SuperadminAnalyticsSecondaryMetrics metrics={viewModel.secondaryMetrics} />
    </div>
  );
}
