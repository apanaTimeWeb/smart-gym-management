// RESPONSIBILITY: Pure View component for the Dashboard. Renders KPI cards, charts, and recent onboards by consuming useSuperadminDashboardView.
'use client';
import { SuperadminDashboardHeader } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader';
import { SuperadminDashboardKpiGrid } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid';
import { SuperadminDashboardCharts } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts';
import { SuperadminDashboardRecentOnboards } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards';
import { useSuperadminDashboardView } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/useSuperadminDashboardView';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';
export default function SuperadminDashboardView() {
    const { isPending, isError: error, apiData, timeRange } = useSuperadminDashboardView();
    if (isPending) {
        return (<div className="space-y-6">
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
        <div className="flex flex-col items-center justify-center p-12 bg-surface border border-danger/20 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Failed to load dashboard</h3>
          <p className="text-text-secondary text-center max-w-md">
            We couldn't fetch the latest dashboard metrics. Please check if the backend server is running and try refreshing the page.
          </p>
        </div>
      </div>);
    }
    const { metrics, revenue: revenueChartData, growth: growthChartData = [] } = apiData;
    const timeMultiplier = 1; // Backend returns properly scaled metrics
    const mrrLabel = (timeRange === 'this_year' || timeRange === 'yearly') ? 'YEARLY INCOME' : 'TOTAL INCOME';
    return (<div className="space-y-6">
      <SuperadminDashboardHeader />

      <SuperadminErrorBoundary variant="inline">
        <SuperadminDashboardKpiGrid metrics={metrics} revenueChartData={revenueChartData} timeMultiplier={timeMultiplier} mrrLabel={mrrLabel}/>
      </SuperadminErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SuperadminErrorBoundary variant="inline">
          <SuperadminDashboardCharts metrics={metrics} revenueChartData={revenueChartData} growthChartData={growthChartData} timeMultiplier={timeMultiplier} mrrLabel={mrrLabel}/>
        </SuperadminErrorBoundary>
        <div className="lg:col-span-3">
          <SuperadminErrorBoundary variant="inline">
            <SuperadminDashboardRecentOnboards recentOnboards={metrics.recentOnboards}/>
          </SuperadminErrorBoundary>
        </div>
      </div>
    </div>);
}
