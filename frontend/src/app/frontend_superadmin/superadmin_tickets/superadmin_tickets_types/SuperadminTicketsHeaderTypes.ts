// RESPONSIBILITY: Type contract extracted from SuperadminTicketsHeader.tsx; no business behavior.
import { SUPERADMIN_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsConstants';

import type { TicketStatus, TicketPriority } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';



export interface SuperadminTicketsHeaderProps {
    search: string;
    setSearch: (value: string) => void;
    showFilter: boolean;
    setShowFilter: (show: boolean) => void;
    statusFilter: TicketStatus | typeof SUPERADMIN_TICKETS_ALL_FILTER;
    setStatusFilter: (status: TicketStatus | typeof SUPERADMIN_TICKETS_ALL_FILTER) => void;
    priorityFilter: TicketPriority | typeof SUPERADMIN_TICKETS_ALL_FILTER;
    setPriorityFilter: (priority: TicketPriority | typeof SUPERADMIN_TICKETS_ALL_FILTER) => void;
    onFilterChange: () => void;
}
