'use client';
// DATA FLOW: MSW/Backend → fetchGymDetailBusinessOverview(gymId) → TanStack Query → Gym 360 Overview UI
// RESPONSIBILITY: Owns query orchestration for the route-specific Gym 360 Overview. No JSX.
import { useQuery } from '@tanstack/react-query';

import { fetchGymDetailBusinessOverview } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';


/**
 * Purpose: Owns query orchestration for the route-specific Gym 360 Overview. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsGymDetail.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsGymDetail → consuming feature component.
export function useSuperadminGymsGymDetail(gymId: string) {
    return useQuery({
        queryKey: SUPERADMIN_GYMS_QUERY_KEYS.detailBusinessOverview(gymId),
        queryFn: () => fetchGymDetailBusinessOverview(gymId),
        enabled: gymId.length > 0,
    });
}
