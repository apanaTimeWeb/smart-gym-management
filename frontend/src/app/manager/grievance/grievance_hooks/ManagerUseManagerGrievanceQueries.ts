// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
import { useQuery } from '@tanstack/react-query';
import { ManagerGrievanceApi } from '@/app/manager/grievance/grievance_api/ManagerGrievanceApi';


export const managerGrievanceKeys = {
  all: ['manager', 'grievance'] as const,
  lists: () => [...managerGrievanceKeys.all, 'list'] as const,
};

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerGrievanceTickets() {
  return useQuery({
    queryKey: managerGrievanceKeys.lists(),
    queryFn: async () => (await ManagerGrievanceApi.fetchGrievanceTickets()).data ?? [],
  });
}
