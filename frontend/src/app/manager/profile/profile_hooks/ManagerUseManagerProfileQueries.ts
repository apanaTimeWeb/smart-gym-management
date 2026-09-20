// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { useQuery } from '@tanstack/react-query';
import { managerProfileApi } from '@/app/manager/profile/profile_api/ManagerProfileApi';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerProfileQuery() {
  return useQuery({ queryKey: ['manager', 'profile', 'current'], queryFn: managerProfileApi.fetchProfile });
}
