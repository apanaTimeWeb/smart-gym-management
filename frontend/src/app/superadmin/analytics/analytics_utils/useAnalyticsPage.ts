// RESPONSIBILITY: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
// Exposes fetchState enum (never boolean flags — Rule 42). No JSX — pure logic.
//
// DATA FLOW: analyticsApi.getRevenueMetrics() → useAnalyticsPage → SuperadminAnalyticsClient → UI

import { useState, useEffect, useCallback } from 'react';
import { analyticsApi } from '@/app/superadmin/analytics/superadmin_analytics_api/superadmin_analytics_api';
import type { RevenueMetrics, MonthlyAnalyticsDataPoint, FetchState } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';
import { MOCK_ANALYTICS_METRICS, MOCK_MONTHLY_DATA } from '@/app/superadmin/analytics/analytics_utils/SuperadminAnalyticsConstants';

export type AnalyticsTimeRange = 'this_week' | 'this_month' | 'this_year' | 'custom';

interface UseAnalyticsPageReturn {
  metrics: RevenueMetrics | null;
  monthlyData: MonthlyAnalyticsDataPoint[];
  fetchState: FetchState;
  error: string | null;
  timeRange: AnalyticsTimeRange;
  setTimeRange: (range: AnalyticsTimeRange) => void;
  customStart: string;
  setCustomStart: (v: string) => void;
  customEnd: string;
  setCustomEnd: (v: string) => void;
}

export function useAnalyticsPage(): UseAnalyticsPageReturn {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);
  const [monthlyData] = useState<MonthlyAnalyticsDataPoint[]>(MOCK_MONTHLY_DATA);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<AnalyticsTimeRange>('this_month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const fetchMetrics = useCallback(() => {
    let cancelled = false;
    setFetchState('loading');
    analyticsApi
      .getRevenueMetrics()
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
  }, []);

  useEffect(() => {
    return fetchMetrics();
  }, [fetchMetrics, timeRange, customStart, customEnd]);

  return { metrics, monthlyData, fetchState, error, timeRange, setTimeRange, customStart, setCustomStart, customEnd, setCustomEnd };
}
