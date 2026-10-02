'use client';// DATA FLOW: MSW/Backend → fetchReportsComparison() → TanStack Query → owning V1 feature UI
// RESPONSIBILITY: Owns server-state query orchestration for the owning V1 feature. No JSX and no business UI state.
import { useQuery } from '@tanstack/react-query';

import { fetchReportsComparison } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsComparisonApi';
import { SUPERADMIN_REPORTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsQueryKeys';



/**
 * @description Queries the documented Reports comparison response for the owning V1 feature surface.
 * @dependencies TanStack Query with feature-owned query keys and API client.
 * @edge-case Query failures are exposed to the owning hook/view for retry handling rather than being swallowed.
 */
export function useSuperadminReportsV1() {
  return useQuery({
    queryKey: SUPERADMIN_REPORTS_QUERY_KEYS.comparison,
    queryFn: () => fetchReportsComparison(),
  });
}
