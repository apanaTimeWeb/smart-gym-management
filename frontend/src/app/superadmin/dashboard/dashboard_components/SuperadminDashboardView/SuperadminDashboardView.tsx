'use client';
// RESPONSIBILITY: SuperadminDashboardView.tsx renders the main SaaS metrics dashboard.
// Displays KPI cards with gold gradient, MRR area chart (ApexCharts), and recent onboards panel.
// Syncs time range filter to URL query params (Rule 41). No direct API calls — uses TanStack Query.
//
// DATA FLOW: superadminApi.dashboard.fetchDashboardData() → useQuery → SuperadminDashboardView → KPI + Chart JSX

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import type { SaaSDashboardMetrics, RevenueChartData, GrowthChartData, TimeRange } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';
import { SuperadminDashboardHeader } from './SuperadminDashboardHeader';
import { SuperadminDashboardKpiGrid } from './SuperadminDashboardKpiGrid';
import { SuperadminDashboardCharts } from './SuperadminDashboardCharts';
import { SuperadminDashboardRecentOnboards } from './SuperadminDashboardRecentOnboards';

/**
 * Type-safe shape of the dashboard API response data object.
 */
interface DashboardApiData {
  metrics: SaaSDashboardMetrics;
  revenue: RevenueChartData[];
  growth: GrowthChartData[];
}

export default function SuperadminDashboardView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Rule 41: Sync filter state to URL query params for shareable views
  const timeRangeFromUrl = (searchParams.get('range') as TimeRange) ?? 'monthly';
  const [timeRange, setTimeRange] = useState<TimeRange>(timeRangeFromUrl);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleTimeRangeChange = useCallback((newRange: TimeRange) => {
    setTimeRange(newRange);
    if (newRange !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', newRange);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'dashboard', timeRange, startDate, endDate],
    queryFn: () => {
      const params: Record<string, string> = { range: timeRange };
      if (timeRange === 'custom') {
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
      }
      return superadminApi.dashboard.fetchDashboardData(params);
    },
  });

  const fetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const apiData = fetchRes?.data as unknown as DashboardApiData | undefined;

  if (fetchState === 'loading') {
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

  if (isError || !apiData) {
    return (
      <div className="p-8 text-center text-danger font-medium">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  const { metrics, revenue: revenueChartData, growth: growthChartData = [] } = apiData;

  const timeMultiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;
  const mrrLabel = timeRange === 'weekly' ? 'WEEKLY RR' : timeRange === 'yearly' ? 'YEARLY RR' : timeRange === 'custom' ? 'CUSTOM RR' : 'TOTAL MRR';

  return (
    <div className="space-y-6">
      <SuperadminDashboardHeader
        timeRange={timeRange}
        startDate={startDate}
        endDate={endDate}
        handleTimeRangeChange={handleTimeRangeChange}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <SuperadminDashboardKpiGrid
        metrics={metrics}
        revenueChartData={revenueChartData}
        timeMultiplier={timeMultiplier}
        mrrLabel={mrrLabel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SuperadminDashboardCharts
          metrics={metrics}
          revenueChartData={revenueChartData}
          growthChartData={growthChartData}
          timeMultiplier={timeMultiplier}
          mrrLabel={mrrLabel}
        />
        <div className="lg:col-span-3">
          <SuperadminDashboardRecentOnboards recentOnboards={metrics.recentOnboards} />
        </div>
      </div>
    </div>
  );
}
