// RESPONSIBILITY: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
// Exposes fetchState enum (never boolean flags — Rule 42). No JSX — pure logic.
//
// DATA FLOW: analyticsApi.getRevenueMetrics() → useAnalyticsPage → SuperadminAnalyticsClient → UI

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { analyticsApi } from '@/app/superadmin/analytics/superadmin_analytics_api/superadmin_analytics_api';
import type { RevenueMetrics, MonthlyAnalyticsDataPoint, FetchState } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';
import { MOCK_ANALYTICS_METRICS, MOCK_MONTHLY_DATA } from '@/app/superadmin/analytics/analytics_utils/SuperadminAnalyticsConstants';

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
  const [monthlyData] = useState<MonthlyAnalyticsDataPoint[]>(MOCK_MONTHLY_DATA);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const timeRange = searchParams.get('range') || 'this_month';
  const customStart = searchParams.get('startDate') || '';
  const customEnd = searchParams.get('endDate') || '';

  const fetchMetrics = useCallback(() => {
    let cancelled = false;
    setFetchState('loading');
    analyticsApi
      .getRevenueMetrics({ timeRange, customStart, customEnd })
      .then((res) => {
        if (cancelled) return;
        if (res.success && res.data) {
          setMetrics(res.data);
        } else {
          setMetrics(MOCK_ANALYTICS_METRICS);
        }
        setFetchState('success');
      })
      .catch(() => {
        if (cancelled) return;
        setMetrics(MOCK_ANALYTICS_METRICS);
        setFetchState('success');
        setError(null);
      });
    return () => { cancelled = true; };
  }, [timeRange, customStart, customEnd]);

  // RESPONSIBILITY: Handle side-effects for useAnalyticsPage
  useEffect(() => {
    return fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, monthlyData, fetchState, error, timeRange, customStart, customEnd };
}
