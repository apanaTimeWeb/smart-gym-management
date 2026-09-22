// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerGrievanceApi } from '@/app/manager/grievance/grievance_api/ManagerGrievanceApi';
import { managerGrievanceKeys } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceQueries';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerGrievanceMutations() {
  const queryClient = useQueryClient();
  const createGrievanceTicket = useMutation({
    mutationFn: (payload: Parameters<typeof ManagerGrievanceApi.createGrievanceTicket>[0]) => ManagerGrievanceApi.createGrievanceTicket(payload),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: managerGrievanceKeys.lists() });
      showManagerSuccessToast(response.message, 'manager-grievance-create-success');
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-grievance-create-error');
    },
  });
  const resolveGrievanceTicket = useMutation({
    mutationFn: ({ id, resolutionNote }: { id: string; resolutionNote: string }) => ManagerGrievanceApi.resolveGrievanceTicket(id, resolutionNote),
    onSuccess: async (response, variables) => {
      await queryClient.invalidateQueries({ queryKey: managerGrievanceKeys.lists() });
      showManagerSuccessToast(response.message, `manager-grievance-resolve-${variables.id}`);
    },
    onError: (error: unknown) => {
      showManagerErrorToast(error, 'manager-grievance-resolve-error');
    },
  });
  return { createGrievanceTicket, resolveGrievanceTicket };
}
