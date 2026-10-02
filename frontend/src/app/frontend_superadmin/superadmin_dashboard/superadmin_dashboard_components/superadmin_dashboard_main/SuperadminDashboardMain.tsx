'use client';// RESPONSIBILITY: Orchestrates the Superadmin Dashboard layout and child data-view sections. No API calls; server state comes from the owning hook.
import { useTranslations } from 'next-intl';

import { SuperadminDashboardCharts } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardCharts';
import { SuperadminDashboardHeader } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardHeader';
import { SuperadminDashboardKpiGrid } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardKpiGrid';
import { SuperadminDashboardRecentOnboards } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardRecentOnboards';
import { SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';
import { useSuperadminDashboardMain } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_hooks/useSuperadminDashboardMain';
import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';



/**
 * @description Orchestrates the Superadmin Dashboard layout and child data-view sections from the owning TanStack Query hook.
 * @dependencies Uses the module-owned dashboard query hook and approved global error-boundary infrastructure.
 * @edge-case Preserves loading, safe error, translated labels, responsive layout, and child-section retry behavior.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminDashboardMain() {
  const t = useTranslations('superadmin_dashboard');
    const { isPending, isError: error, apiData, timeRange } = useSuperadminDashboardMain();
    if (isPending) {
        return (<div className="space-y-6" data-testid="superadmin_dashboard-superadmin-dashboard-main-page">
        <div>
          <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded"/>
          <div className="h-4 w-96 bg-skeleton-base motion-safe:animate-pulse rounded mt-2"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (<div key={`kpi-skeleton-${i}`} className="bg-skeleton-base border border-border rounded-xl p-6 h-32 motion-safe:animate-pulse"/>))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"/>
          <div className="bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"/>
        </div>
      </div>);
    }
    if (error || !apiData) {
        return (<div className="p-8 text-center text-danger font-medium">
        <div className="flex flex-col items-center justify-center p-12 bg-danger-bg border border-border rounded-xl">
          <div className="w-12 h-12 rounded-full bg-danger-bg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">{t('ui.failed_to_load_dashboard_ba720cf')}</h3>
          <p className="text-secondary text-center max-w-md">
            
            {t('ui.we_couldn_t_fetch_the_latest_dashboard_metrics_p_ee11511')}
          </p>
        </div>
      </div>);
    }
    const { metrics, revenue: revenueChartData, growth: growthChartData = [] } = apiData;
    const timeMultiplier = SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER;
    const mrrLabel = t((timeRange === 'this_year' || timeRange === 'yearly') ? 'ui.yearly_income' : 'ui.total_income');
    return (<div className="space-y-6" data-testid="superadmin_dashboard-superadmin-dashboard-main-page-ready">
      <SuperadminDashboardHeader />

      <SuperadminLayoutErrorBoundary variant="inline">
        <SuperadminDashboardKpiGrid metrics={metrics} revenueChartData={revenueChartData} timeMultiplier={timeMultiplier} mrrLabel={mrrLabel}/>
      </SuperadminLayoutErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SuperadminLayoutErrorBoundary variant="inline">
          <SuperadminDashboardCharts metrics={metrics} revenueChartData={revenueChartData} growthChartData={growthChartData} timeMultiplier={timeMultiplier} mrrLabel={mrrLabel}/>
        </SuperadminLayoutErrorBoundary>
        <div className="lg:col-span-3">
          <SuperadminLayoutErrorBoundary variant="inline">
            <SuperadminDashboardRecentOnboards recentOnboards={metrics.recentOnboards}/>
          </SuperadminLayoutErrorBoundary>
        </div>
      </div>
    </div>);
}
