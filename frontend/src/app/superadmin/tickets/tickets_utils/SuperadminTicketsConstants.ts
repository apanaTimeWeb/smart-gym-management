// RESPONSIBILITY: Contains constants and mock data for Superadmin Tickets
import type { TicketPriority, TicketStatus, SupportTicket } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
export const PriorityColors: Record<TicketPriority, string> = {
    LOW: 'text-success bg-success/10 border-success/20',
    NORMAL: 'text-secondary bg-surface-highlight border-border',
    MEDIUM: 'text-primary bg-primary/10 border-primary/20',
    HIGH: 'text-warning bg-warning/10 border-warning/20',
    URGENT: 'text-warning bg-warning/10 border-warning/20',
    CRITICAL: 'text-danger bg-danger-bg/10 border-danger/20'
};
export const StatusColors: Record<TicketStatus, string> = {
    OPEN: 'text-warning',
    IN_PROGRESS: 'text-primary',
    WAITING: 'text-warning',
    RESOLVED: 'text-success',
    CLOSED: 'text-secondary'
};
