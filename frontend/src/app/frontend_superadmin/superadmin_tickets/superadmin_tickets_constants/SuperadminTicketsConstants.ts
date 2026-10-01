// RESPONSIBILITY: Contains constants and mock data for Superadmin Tickets
import type { TicketPriority, TicketStatus, SupportTicket } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';
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

export const SUPERADMIN_TICKETS_STATUS_CODES = { OPEN: 'OPEN', IN_PROGRESS: 'IN_PROGRESS', WAITING: 'WAITING', RESOLVED: 'RESOLVED', CLOSED: 'CLOSED' } as const;

export const SUPERADMIN_TICKETS_ALL_FILTER = 'ALL' as const;

export const SUPERADMIN_TICKETS_PRIORITY_CODES = { LOW: 'LOW', NORMAL: 'NORMAL', MEDIUM: 'MEDIUM', HIGH: 'HIGH', URGENT: 'URGENT', CRITICAL: 'CRITICAL' } as const;
