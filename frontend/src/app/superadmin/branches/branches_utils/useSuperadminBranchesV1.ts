// DATA FLOW: URL period/filter → fetchBranchesComparison(params) → TanStack Query → branch comparison UI.
// RESPONSIBILITY: Owns URL-backed period/filter state for Branch Performance Comparison.
'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBranchesComparison } from '@/app/superadmin/branches/branches_api/SuperadminBranchesComparisonApi';
import { useUrlState } from '@/hooks/useUrlState';

/**
 * Purpose: Keeps branch-comparison period/filter controls in the URL and propagates them to the API.
 * Inputs: URL query parameters named period and comparisonFilter.
 * Output: TanStack Query state plus selected control values and setters.
 * Side effects: URL state changes and server-state refetches only.
 * Invariant: toolbar state must always be represented in the API query key/request.
 */
export function useSuperadminBranchesV1() {
  const { getParam, setParam } = useUrlState();
  const period = getParam('period', '30d');
  const comparisonFilter = getParam('comparisonFilter', 'all');
  const params = useMemo(() => ({ period, filter: comparisonFilter }), [period, comparisonFilter]);
  const query = useQuery({ queryKey: ['superadmin', 'branches_comparison', params], queryFn: () => fetchBranchesComparison(params) });
  return {
    query,
    period,
    comparisonFilter,
    setPeriod: (value: string) => setParam('period', value),
    setComparisonFilter: (value: string) => setParam('comparisonFilter', value),
  };
}
