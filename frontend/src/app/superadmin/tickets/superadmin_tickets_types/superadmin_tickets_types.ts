// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Tickets module.
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SupportTicket {
  id: string;
  tenantId: string;
  tenantName: string;
  reporterEmail: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  attachments?: string[];
  slaBreachAt?: string;
  createdAt: string;
  lastUpdated: string;
}
