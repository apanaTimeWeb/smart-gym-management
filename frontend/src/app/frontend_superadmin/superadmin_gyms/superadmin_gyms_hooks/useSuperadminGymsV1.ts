'use client';
// DATA FLOW: MSW/Backend → fetchGymsBusinessControls() → TanStack Query → owning V1 feature UI
// RESPONSIBILITY: Owns server-state query orchestration for the owning V1 feature. No JSX and no business UI state.
import { useQuery } from '@tanstack/react-query';

import { fetchGymsBusinessControls } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsBusinessControlsApi';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';



/**
 * @description Queries Gym business-control data for the owning V1 feature surface.
 * @dependencies TanStack Query with the feature API and query-key registry.
 * @edge-case Query failures are returned untouched to the owner so its error boundary/retry UI remains the single user-facing recovery path.
 */
export function useSuperadminGymsV1() {
  return useQuery({
    queryKey: SUPERADMIN_GYMS_QUERY_KEYS.businessControls,
    queryFn: () => fetchGymsBusinessControls(),
  });
}
