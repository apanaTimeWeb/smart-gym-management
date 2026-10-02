'use client';// DATA FLOW: MSW/Backend → fetchBroadcastAudienceInsights() → TanStack Query → owning V1 feature UI
// RESPONSIBILITY: Owns server-state query orchestration for the owning V1 feature. No JSX and no business UI state.
import { useQuery } from '@tanstack/react-query';

import { fetchBroadcastAudienceInsights } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi';
import { SUPERADMIN_BROADCASTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsQueryKeys';



/**
 * @description Queries the documented V1 broadcast audience-insights response for the owning page.
 * @dependencies TanStack Query plus the feature API and query-key registry.
 * @edge-case Query errors are returned to the owner so the route-level error/retry UI can recover without local duplication.
 */
export function useSuperadminBroadcastsV1() {
  return useQuery({
    queryKey: SUPERADMIN_BROADCASTS_QUERY_KEYS.audienceInsights,
    queryFn: () => fetchBroadcastAudienceInsights(),
  });
}
