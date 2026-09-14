// RESPONSIBILITY: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
// Exposes fetchState enum (never boolean flags — Rule 42). No JSX — pure logic.
//
// DATA FLOW: analyticsApi.fetchRevenueMetrics() → useAnalyticsPage → SuperadminAnalyticsClient → UI

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { analyticsApi } from '@/app/superadmin/analytics/superadmin_analytics_api/superadmin_analytics_api';
import type { RevenueMetrics, MonthlyAnalyticsDataPoint, FetchState } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';

export type AnalyticsTimeRange = 'this_week' | 'this_month' | 'this_year' | 'custom';

interface UseAnalyticsPageReturn {
  metrics: RevenueMetrics | null;
  monthlyData: MonthlyAnalyticsDataPoint[];
  fetchState: FetchState;
  error: string | null;
  timeRange: string;
  customStart: string;
  customEnd: string;
}

export function useAnalyticsPage(): UseAnalyticsPageReturn {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyAnalyticsDataPoint[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const timeRange = searchParams.get('range') || 'this_month';
  const customStart = searchParams.get('startDate') || '';
  const customEnd = searchParams.get('endDate') || '';

  const fetchMetrics = useCallback(() => {
    let cancelled = false;
    setFetchState('loading');
    setError(null);
    analyticsApi
      .fetchRevenueMetrics({ timeRange, customStart, customEnd })
      .then((res) => {
        if (cancelled) return;
        if (res.data) {
          setMetrics(res.data.metrics);
          setMonthlyData(res.data.monthly || []);
          setFetchState('success');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Failed to fetch analytics');
        setFetchState('error');
      });
    return () => { cancelled = true; };
  }, [timeRange, customStart, customEnd]);

  // RESPONSIBILITY: Handle side-effects for useAnalyticsPage
  useEffect(() => {
    return fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, monthlyData, fetchState, error, timeRange, customStart, customEnd };
}
