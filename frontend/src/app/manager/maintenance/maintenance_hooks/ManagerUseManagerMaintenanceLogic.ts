// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
import { useManagerMaintenanceMutations } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceMutations';
import { useManagerMaintenanceTickets } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceQueries';
import type { CreateMaintenanceTicketPayload } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMaintenanceLogic() {
  const { data: tickets = [], isPending, isError, error, refetch } = useManagerMaintenanceTickets();
  const { createMaintenanceTicket, resolveMaintenanceTicket } = useManagerMaintenanceMutations();

  const handleCreateTicket = async (payload: CreateMaintenanceTicketPayload) => {
    try {
      await createMaintenanceTicket.mutateAsync(payload);
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string) => {
    try {
      await resolveMaintenanceTicket.mutateAsync(id);
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
    isCreating: createMaintenanceTicket.isPending,
    isResolving: resolveMaintenanceTicket.isPending,
  };
}
