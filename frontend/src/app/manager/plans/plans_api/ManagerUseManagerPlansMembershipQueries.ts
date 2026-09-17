import { useQuery } from '@tanstack/react-query';
import { managerPlansMembershipApi } from '@/app/manager/plans/plans_api/ManagerPlansMembershipApi';

export function useManagerPlansMembershipOverviewQuery() {
  return useQuery({
    queryKey: ['manager', 'plans', 'membership-overview'],
    queryFn: async () => {
      const response = await managerPlansMembershipApi.fetchMembershipOverview();
      if (!response.data) throw new Error(response.message);
      return response.data;
    },
  });
}
