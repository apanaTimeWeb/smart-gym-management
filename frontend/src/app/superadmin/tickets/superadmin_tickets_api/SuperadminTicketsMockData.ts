import type { SupportTicket } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';

export const MOCK_SUPERADMIN_TICKETS: SupportTicket[] = [
  {
    id: 'tkt1', tenantId: 't1', tenantName: 'Iron Paradise', reporterEmail: 'admin@iron.com',
    subject: 'Billing Issue', description: 'Double charged this month.', status: 'OPEN',
    priority: 'HIGH', messages: [], createdAt: '2023-11-20T10:00:00Z', lastUpdated: '2023-11-20T10:00:00Z'
  },
  {
    id: 'tkt2', tenantId: 't2', tenantName: 'Fit Life Studio', reporterEmail: 'help@fitlife.com',
    subject: 'Feature Request: WhatsApp integration', description: 'Would love to have WhatsApp.', status: 'IN_PROGRESS',
    priority: 'LOW', assignedTo: 'John Support', messages: [], createdAt: '2023-11-15T14:30:00Z', lastUpdated: '2023-11-18T09:15:00Z'
  }
];
