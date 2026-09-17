// DATA FLOW: MSW/Backend → fetchGymDetailBusinessOverview(gymId) → TanStack Query → Gym 360 Overview UI
// RESPONSIBILITY: Owns query orchestration for the route-specific Gym 360 Overview. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchGymDetailBusinessOverview } from '@/app/superadmin/gyms/gyms_api/superadmin_gym_detail_business_overview_api';
export function useSuperadminGymDetailV1(gymId: string) {
    return useQuery({
        queryKey: ['superadmin', 'gym', 'detail-business-overview', gymId],
        queryFn: () => fetchGymDetailBusinessOverview(gymId),
        enabled: gymId.length > 0,
    });
}
