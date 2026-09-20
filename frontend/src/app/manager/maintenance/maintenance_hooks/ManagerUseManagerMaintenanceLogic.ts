import { useManagerMaintenanceTickets } from '@/app/manager/maintenance/maintenance_api/ManagerUseManagerMaintenanceQueries';
import { useManagerMaintenanceMutations } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceMutations';
import { type CreateMaintenanceTicketPayload } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';

export function useManagerMaintenanceLogic() {
  const { data: tickets = [], isLoading, isError, refetch } = useManagerMaintenanceTickets();
  const { createTicket, resolveTicket } = useManagerMaintenanceMutations();

  const handleCreateTicket = async (payload: CreateMaintenanceTicketPayload) => {
    try {
      await createTicket.mutateAsync(payload);
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string) => {
    try {
      await resolveTicket.mutateAsync(id);
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
