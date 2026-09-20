import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerMaintenanceApi } from '@/app/manager/maintenance/maintenance_api/ManagerMaintenanceApi';
import { managerMaintenanceKeys } from '@/app/manager/maintenance/maintenance_api/ManagerUseManagerMaintenanceQueries';
import toast from 'react-hot-toast';

export function useManagerMaintenanceMutations() {
  const queryClient = useQueryClient();

  const createTicket = useMutation({
    mutationFn: ManagerMaintenanceApi.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerMaintenanceKeys.lists() });
      toast.success('Maintenance issue logged successfully');
    },
    onError: () => {
      toast.error('Failed to log maintenance issue');
    }
  });

  const resolveTicket = useMutation({
    mutationFn: (id: string) => ManagerMaintenanceApi.resolveTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerMaintenanceKeys.lists() });
      toast.success('Issue marked as resolved');
    },
    onError: () => {
      toast.error('Failed to resolve issue');
    }
  });

  return { createTicket, resolveTicket };
}
