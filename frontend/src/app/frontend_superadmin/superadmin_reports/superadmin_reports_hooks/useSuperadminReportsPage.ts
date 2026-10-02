'use client';// DATA FLOW: Inputs enter useSuperadminReportsPage, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns all Reports server-state queries and keeps query parameters identical across revenue, cancellation, and health requests.
import { useQuery } from '@tanstack/react-query';

import { superadminReportsApi } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsApi';
import { SUPERADMIN_REPORTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsQueryKeys';



/**
 * Purpose: Centralizes reports server-state access for the Reports route.
 * Inputs: validated URL-derived report parameters.
 * Output: three independent TanStack Query states used by the view tabs.
 * Side effects: cache reads/refetches only; no local server-data copies.
 * Invariant: report components never import or invoke the API service directly.
 */
/**
 * @description Manages reports state, queries, and UI interactions for useSuperadminReportsPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminReportsPage → consuming feature component.
export function useSuperadminReportsPage(queryParams: Record<string, string>) {
  const revenue = useQuery({ queryKey: SUPERADMIN_REPORTS_QUERY_KEYS.revenue(queryParams), queryFn: () => superadminReportsApi.fetchRevenueData(queryParams) });
  const cancellations = useQuery({ queryKey: SUPERADMIN_REPORTS_QUERY_KEYS.cancellations(queryParams), queryFn: () => superadminReportsApi.fetchCancellationsData(queryParams) });
  const health = useQuery({ queryKey: SUPERADMIN_REPORTS_QUERY_KEYS.health(queryParams), queryFn: () => superadminReportsApi.fetchHealthData(queryParams) });
  return { revenue, cancellations, health };
}
