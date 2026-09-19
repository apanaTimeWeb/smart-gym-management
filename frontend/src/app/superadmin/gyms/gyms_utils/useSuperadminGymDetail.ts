// DATA FLOW: MSW/Backend → fetchGymDetailBusinessOverview(gymId) → TanStack Query → Gym 360 Overview UI
// RESPONSIBILITY: Owns query orchestration for the route-specific Gym 360 Overview. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchGymDetailBusinessOverview } from '@/app/superadmin/gyms/gyms_api/SuperadminGymDetailBusinessOverviewApi';
/**
 * Purpose: Owns query orchestration for the route-specific Gym 360 Overview. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminGymDetail(gymId: string) {
    return useQuery({
        queryKey: ['superadmin', 'gym', 'detail-business-overview', gymId],
        queryFn: () => fetchGymDetailBusinessOverview(gymId),
        enabled: gymId.length > 0,
    });
}
