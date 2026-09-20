import { useManagerGrievanceTickets } from '@/app/manager/grievance/grievance_api/ManagerUseManagerGrievanceQueries';
import { useManagerGrievanceMutations } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceMutations';
import { type CreateGrievanceTicketPayload } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';

export function useManagerGrievanceLogic() {
  const { data: tickets = [], isLoading, isError, refetch } = useManagerGrievanceTickets();
  const { createTicket, resolveTicket } = useManagerGrievanceMutations();

  const handleCreateTicket = async (payload: CreateGrievanceTicketPayload) => {
    try {
      await createTicket.mutateAsync(payload);
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string, resolutionNote: string) => {
    try {
      await resolveTicket.mutateAsync({ id, resolutionNote });
      return true;
    } catch {
      return false;
    }
  };

  return { 
    tickets, 
    isLoading, 
    isError, 
    reload: refetch, 
    createTicket: handleCreateTicket, 
    resolveTicket: handleResolveTicket 
  };
}
