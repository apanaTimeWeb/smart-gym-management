// RESPONSIBILITY: Type contract extracted from SuperadminTicketsTable.tsx; no business behavior.
import type { SupportTicket } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';

export interface SuperadminTicketsTableProps {
    tickets: SupportTicket[];
    onReply: (ticketId: string) => void;
    onClose?: (ticketId: string) => void;
    onAssign?: (ticketId: string) => void;
}
