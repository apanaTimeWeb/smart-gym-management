import { useQuery } from '@tanstack/react-query';
import { ManagerMaintenanceApi } from '@/app/manager/maintenance/maintenance_api/ManagerMaintenanceApi';

export const managerMaintenanceKeys = {
  all: ['manager', 'maintenance'] as const,
  lists: () => [...managerMaintenanceKeys.all, 'list'] as const,
};

export function useManagerMaintenanceTickets() {
  return useQuery({
    queryKey: managerMaintenanceKeys.lists(),
    queryFn: () => ManagerMaintenanceApi.getTickets(),
  });
}
