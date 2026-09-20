import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerGrievanceApi } from '@/app/manager/grievance/grievance_api/ManagerGrievanceApi';
import { managerGrievanceKeys } from '@/app/manager/grievance/grievance_api/ManagerUseManagerGrievanceQueries';
import toast from 'react-hot-toast';

export function useManagerGrievanceMutations() {
  const queryClient = useQueryClient();

  const createTicket = useMutation({
    mutationFn: ManagerGrievanceApi.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerGrievanceKeys.lists() });
      toast.success('Grievance logged successfully');
    },
    onError: () => {
      toast.error('Failed to log grievance');
    }
  });

  const resolveTicket = useMutation({
    mutationFn: ({ id, resolutionNote }: { id: string, resolutionNote: string }) => ManagerGrievanceApi.resolveTicket(id, resolutionNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerGrievanceKeys.lists() });
      toast.success('Grievance resolved successfully');
    },
    onError: () => {
      toast.error('Failed to resolve grievance');
    }
  });

  return { createTicket, resolveTicket };
}
