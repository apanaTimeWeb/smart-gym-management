import type { MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes';

export interface ManagerMaintenanceContentProps {
  tickets: MaintenanceTicket[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  reload: () => unknown;
  resolveTicket: (ticketId: string) => Promise<unknown>;
  isResolving: boolean;
  locale: string;
}
