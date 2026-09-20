// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { useQuery } from '@tanstack/react-query';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerPlansMembershipOverviewQuery() {
  return useQuery({
    queryKey: ['manager', 'plans', 'membership-overview'],
    queryFn: async () => {
      const response = await plansApi.fetchMembershipOverview();
      if (!response.data) throw new Error(response.message);
      return response.data;
    } });
}
