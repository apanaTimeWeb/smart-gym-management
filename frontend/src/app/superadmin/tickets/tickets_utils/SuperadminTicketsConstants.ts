// RESPONSIBILITY: Contains constants and mock data for Superadmin Tickets
import type { TicketPriority, TicketStatus, SupportTicket } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
export const PriorityColors: Record<TicketPriority, string> = {
    LOW: 'text-success bg-success-bg border-border',
    NORMAL: 'text-secondary bg-surface-highlight border-border',
    MEDIUM: 'text-primary bg-primary-subtle border-border',
    HIGH: 'text-warning bg-warning-bg border-border',
    URGENT: 'text-warning bg-warning-bg border-border',
    CRITICAL: 'text-danger bg-danger-bg border-border'
};
export const StatusColors: Record<TicketStatus, string> = {
    OPEN: 'text-warning',
    IN_PROGRESS: 'text-primary',
    WAITING: 'text-warning',
    RESOLVED: 'text-success',
    CLOSED: 'text-secondary'
};
