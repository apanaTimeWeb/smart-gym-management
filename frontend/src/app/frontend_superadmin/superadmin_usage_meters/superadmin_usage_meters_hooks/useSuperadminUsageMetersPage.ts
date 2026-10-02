'use client';// DATA FLOW: Inputs enter useSuperadminUsageMetersPage, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Usage Meters query state for search and page parameters.
import { useQuery } from '@tanstack/react-query';

import { usageMetersApi } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_api/SuperadminUsageMetersApi';
import { SUPERADMIN_USAGE_METERS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_constants/SuperadminUsageMetersQueryKeys';


/**
 * Purpose: Fetches server-backed usage-meter data for the current parameter set.
 * Inputs: query parameters.
 * Output: Query state for the Usage Meters page.
 * Side effects: TanStack Query cache only.
 * Invariant: the component does not call the API service directly.
 */
/**
 * @description Manages usage meters state, queries, and UI interactions for useSuperadminUsageMetersPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminUsageMetersPage → consuming feature component.
export function useSuperadminUsageMetersPage(params: Record<string, string>) {
  return useQuery({ queryKey: SUPERADMIN_USAGE_METERS_QUERY_KEYS.list(params), queryFn: () => usageMetersApi.fetchUsageMeters(params) });
}
