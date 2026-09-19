// RESPONSIBILITY: Owns all Reports server-state queries and keeps query parameters identical across revenue, cancellation, and health requests.
'use client';
import { useQuery } from '@tanstack/react-query';
import { superadminReportsApi } from '@/app/superadmin/reports/reports_api/SuperadminReportsApi';

/**
 * Purpose: Centralizes reports server-state access for the Reports route.
 * Inputs: validated URL-derived report parameters.
 * Output: three independent TanStack Query states used by the view tabs.
 * Side effects: cache reads/refetches only; no local server-data copies.
 * Invariant: report components never import or invoke the API service directly.
 */
export function useSuperadminReportsPage(queryParams: Record<string, string>) {
  const revenue = useQuery({ queryKey: ['superadmin', 'reports', 'revenue', queryParams], queryFn: () => superadminReportsApi.fetchRevenueData(queryParams) });
  const cancellations = useQuery({ queryKey: ['superadmin', 'reports', 'cancellations', queryParams], queryFn: () => superadminReportsApi.fetchCancellationsData(queryParams) });
  const health = useQuery({ queryKey: ['superadmin', 'reports', 'health', queryParams], queryFn: () => superadminReportsApi.fetchHealthData(queryParams) });
  return { revenue, cancellations, health };
}
