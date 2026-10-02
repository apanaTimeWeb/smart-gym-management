'use client';
// DATA FLOW: MSW/Backend → fetchPlansBusinessControls() → TanStack Query → owning V1 feature UI
// RESPONSIBILITY: Owns server-state query orchestration for the owning V1 feature. No JSX and no business UI state.
import { useQuery } from '@tanstack/react-query';

import { fetchPlansBusinessControls } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansBusinessControlsApi';
import { SUPERADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_constants/SuperadminPlansQueryKeys';



/**
 * @description Queries Plans business-control data for the owning V1 feature.
 * @dependencies TanStack Query, feature query keys, and the Plans API client.
 * @edge-case Query failures remain observable by the UI so the documented error/retry state can render.
 */
export function useSuperadminPlansV1() {
  return useQuery({
    queryKey: SUPERADMIN_PLANS_QUERY_KEYS.businessControls,
    queryFn: () => fetchPlansBusinessControls(),
  });
}
