// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerMaintenanceApi } from '@/app/manager/maintenance/maintenance_api/ManagerMaintenanceApi';
import { managerMaintenanceKeys } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceQueries';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMaintenanceMutations() {
  const queryClient = useQueryClient();
  const createMaintenanceTicket = useMutation({
    mutationFn: (payload: Parameters<typeof ManagerMaintenanceApi.createMaintenanceTicket>[0]) => ManagerMaintenanceApi.createMaintenanceTicket(payload),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: managerMaintenanceKeys.lists() });
      showManagerSuccessToast(response.message, 'manager-maintenance-create-success');
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-maintenance-create-error');
    },
  });
  const resolveMaintenanceTicket = useMutation({
    mutationFn: (id: string) => ManagerMaintenanceApi.resolveMaintenanceTicket(id),
    onSuccess: async (response, id) => {
      await queryClient.invalidateQueries({ queryKey: managerMaintenanceKeys.lists() });
      showManagerSuccessToast(response.message, `manager-maintenance-resolve-${id}`);
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-maintenance-resolve-error');
    },
  });
  return { createMaintenanceTicket, resolveMaintenanceTicket };
}
