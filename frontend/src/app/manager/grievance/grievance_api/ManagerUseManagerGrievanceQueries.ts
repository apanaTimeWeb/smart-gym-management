import { useQuery } from '@tanstack/react-query';
import { ManagerGrievanceApi } from '@/app/manager/grievance/grievance_api/ManagerGrievanceApi';

export const managerGrievanceKeys = {
  all: ['manager', 'grievance'] as const,
  lists: () => [...managerGrievanceKeys.all, 'list'] as const,
};

export function useManagerGrievanceTickets() {
  return useQuery({
    queryKey: managerGrievanceKeys.lists(),
    queryFn: () => ManagerGrievanceApi.getTickets(),
  });
}
