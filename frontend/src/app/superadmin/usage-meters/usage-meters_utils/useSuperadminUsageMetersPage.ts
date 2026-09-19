// RESPONSIBILITY: Owns Usage Meters query state for search and page parameters.
'use client';
import { useQuery } from '@tanstack/react-query';
import { usageMetersApi } from '@/app/superadmin/usage-meters/usage-meters_api/SuperadminUsageMetersApi';
/**
 * Purpose: Fetches server-backed usage-meter data for the current parameter set.
 * Inputs: query parameters.
 * Output: Query state for the Usage Meters page.
 * Side effects: TanStack Query cache only.
 * Invariant: the component does not call the API service directly.
 */
export function useSuperadminUsageMetersPage(params: Record<string, string>) {
  return useQuery({ queryKey: ['superadmin', 'usage-meters', params], queryFn: () => usageMetersApi.fetchUsageMeters(params) });
}
