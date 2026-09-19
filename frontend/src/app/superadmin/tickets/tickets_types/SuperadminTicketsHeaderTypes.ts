// RESPONSIBILITY: Type contract extracted from SuperadminTicketsHeader.tsx; no business behavior.
import type { TicketStatus, TicketPriority } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';

export interface SuperadminTicketsHeaderProps {
    search: string;
    setSearch: (value: string) => void;
    showFilter: boolean;
    setShowFilter: (show: boolean) => void;
    statusFilter: TicketStatus | 'ALL';
    setStatusFilter: (status: TicketStatus | 'ALL') => void;
    priorityFilter: TicketPriority | 'ALL';
    setPriorityFilter: (priority: TicketPriority | 'ALL') => void;
    onFilterChange: () => void;
}
