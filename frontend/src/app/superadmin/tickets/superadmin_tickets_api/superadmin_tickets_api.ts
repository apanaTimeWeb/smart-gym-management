// RESPONSIBILITY: Modularized API client for the Tickets module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SupportTicket } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';

import { MOCK_SUPERADMIN_TICKETS } from '@/app/superadmin/tickets/superadmin_tickets_api/SuperadminTicketsMockData';

let mockTickets = [...MOCK_SUPERADMIN_TICKETS];

export const ticketsApi = {
  fetchTickets: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockTickets };
  },
  fetchTicketById: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: 'Success', data: mockTickets.find(t => t.id === id) as SupportTicket };
  },
  updateTicket: async (id: string, body: Partial<SupportTicket>) => {
    await new Promise(r => setTimeout(r, 500));
    mockTickets = mockTickets.map(t => t.id === id ? { ...t, ...body, lastUpdated: new Date().toISOString() } : t);
    return { success: true, message: 'Updated', data: mockTickets.find(t => t.id === id) as SupportTicket };
  },
  closeTicket: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockTickets = mockTickets.map(t => t.id === id ? { ...t, status: 'CLOSED', lastUpdated: new Date().toISOString() } : t);
    return { success: true, message: 'Closed', data: mockTickets.find(t => t.id === id) as SupportTicket };
  },
  assignTicket: async (id: string, assignee: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockTickets = mockTickets.map(t => t.id === id ? { ...t, assignedTo: assignee, status: 'IN_PROGRESS', lastUpdated: new Date().toISOString() } : t);
    return { success: true, message: 'Assigned', data: mockTickets.find(t => t.id === id) as SupportTicket };
  },
};
