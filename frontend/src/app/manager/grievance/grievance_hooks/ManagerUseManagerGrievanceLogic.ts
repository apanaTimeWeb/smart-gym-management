// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
import { useManagerGrievanceMutations } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceMutations';
import { useManagerGrievanceTickets } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceQueries';
import type { CreateGrievanceTicketPayload } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerGrievanceLogic() {
  const { data: tickets = [], isPending, isError, error, refetch } = useManagerGrievanceTickets();
  const { createGrievanceTicket, resolveGrievanceTicket } = useManagerGrievanceMutations();

  const handleCreateTicket = async (payload: CreateGrievanceTicketPayload) => {
    try {
      await createGrievanceTicket.mutateAsync(payload);
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string, resolutionNote: string) => {
    try {
      await resolveGrievanceTicket.mutateAsync({ id, resolutionNote });
      return true;
    } catch {
      return false;
    }
  };

  return {
    tickets,
    isPending,
    isError,
    error,
    reload: refetch,
    createTicket: handleCreateTicket,
    resolveTicket: handleResolveTicket,
    isCreating: createGrievanceTicket.isPending,
    isResolving: resolveGrievanceTicket.isPending,
  };
}
