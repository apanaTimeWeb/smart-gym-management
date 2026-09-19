// DATA FLOW: URL period/segment → fetchReportsComparison(params) → TanStack Query → comparison controls/table.
// RESPONSIBILITY: Owns URL-backed period/segment state for Report Comparison.
'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchReportsComparison } from '@/app/superadmin/reports/reports_api/SuperadminReportsComparisonApi';
import { useUrlState } from '@/hooks/useUrlState';

/**
 * Purpose: Keeps report period and segment selections in the URL and propagates them to the module API.
 * Inputs: period and reportSegment query parameters.
 * Output: TanStack Query state plus selected control values and setters.
 * Side effects: URL updates and corresponding query refetches only.
 * Invariant: selected period/segment always belong to the query key and request parameters.
 */
export function useSuperadminReportsV1() {
  const { getParam, setParam } = useUrlState();
  const period = getParam('reportPeriod', 'month');
  const segment = getParam('reportSegment', 'all');
  const params = useMemo(() => ({ period, segment }), [period, segment]);
  const query = useQuery({ queryKey: ['superadmin', 'reports_comparison', params], queryFn: () => fetchReportsComparison(params) });
  return { query, period, segment, setPeriod: (value: string) => setParam('reportPeriod', value), setSegment: (value: string) => setParam('reportSegment', value) };
}
