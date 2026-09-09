// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Tickets module.
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SupportTicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'TENANT' | 'SUPERADMIN' | 'SYSTEM';
  content: string;
  attachments?: string[];
  createdAt: string;
}

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
  slaDeadline?: string;
  firstResponseAt?: string;
  resolutionTime?: number;
  messages: SupportTicketMessage[];
  createdAt: string;
  lastUpdated: string;
}
