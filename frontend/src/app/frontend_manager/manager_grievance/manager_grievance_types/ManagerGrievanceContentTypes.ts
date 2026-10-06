import type { GrievanceTicket } from '@/app/frontend_manager/manager_grievance/manager_grievance_types/ManagerGrievanceTypes';

export interface ManagerGrievanceContentProps {
  tickets: GrievanceTicket[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  reload: () => unknown;
  isResolving: boolean;
  resolvingTicketId: string | null;
  resolutionNote: string;
  setResolutionNote: (value: string) => void;
  startResolution: (ticketId: string) => void;
  cancelResolution: () => void;
  submitResolution: () => Promise<boolean>;
}
