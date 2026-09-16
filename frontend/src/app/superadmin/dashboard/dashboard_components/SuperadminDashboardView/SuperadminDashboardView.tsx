'use client';
// RESPONSIBILITY: Pure View component for the Dashboard. Renders KPI cards, charts, and recent onboards by consuming useSuperadminDashboardView.

import { SuperadminDashboardHeader } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader';
import { SuperadminDashboardKpiGrid } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid';
import { SuperadminDashboardCharts } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts';
import { SuperadminDashboardRecentOnboards } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards';
import { useSuperadminDashboardView } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/useSuperadminDashboardView';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminErrorBoundary';

export default function SuperadminDashboardView() {
  const { isLoading, isError: error, apiData, timeRange } = useSuperadminDashboardView();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="h-4 w-96 bg-skeleton-base motion-safe:animate-pulse rounded mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={`kpi-skeleton-${i}`} className="bg-skeleton-base border border-border rounded-xl p-6 h-32 motion-safe:animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse" />
          <div className="bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !apiData) {
    return (
      <div className="p-8 text-center text-danger font-medium">
        
      </div>
    );
  }

  const { metrics, revenue: revenueChartData, growth: growthChartData = [] } = apiData;

  const timeMultiplier = 1; // Backend returns properly scaled metrics
  const mrrLabel = (timeRange === 'this_year' || timeRange === 'yearly') ? 'YEARLY INCOME' : 'TOTAL INCOME';

  return (
    <div className="space-y-6">
      <SuperadminDashboardHeader />

      <SuperadminErrorBoundary variant="inline">
        <SuperadminDashboardKpiGrid
          metrics={metrics}
          revenueChartData={revenueChartData}
          timeMultiplier={timeMultiplier}
          mrrLabel={mrrLabel}
        />
      </SuperadminErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SuperadminErrorBoundary variant="inline">
          <SuperadminDashboardCharts
            metrics={metrics}
            revenueChartData={revenueChartData}
            growthChartData={growthChartData}
            timeMultiplier={timeMultiplier}
            mrrLabel={mrrLabel}
          />
        </SuperadminErrorBoundary>
        <div className="lg:col-span-3">
          <SuperadminErrorBoundary variant="inline">
            <SuperadminDashboardRecentOnboards recentOnboards={metrics.recentOnboards} />
          </SuperadminErrorBoundary>
        </div>
      </div>
    </div>
  );
}
