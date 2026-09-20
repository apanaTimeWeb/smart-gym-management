// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
import { useQuery } from '@tanstack/react-query';
import { ManagerMaintenanceApi } from '@/app/manager/maintenance/maintenance_api/ManagerMaintenanceApi';


export const managerMaintenanceKeys = {
  all: ['manager', 'maintenance'] as const,
  lists: () => [...managerMaintenanceKeys.all, 'list'] as const,
};

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMaintenanceTickets() {
  return useQuery({
    queryKey: managerMaintenanceKeys.lists(),
    queryFn: async () => (await ManagerMaintenanceApi.fetchMaintenanceIssues()).data ?? [],
  });
}
