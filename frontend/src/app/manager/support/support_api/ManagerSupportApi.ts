// RESPONSIBILITY: API client for the Manager Support module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { ManagerSupportTicket, CreateSupportTicketPayload } from '@/app/manager/support/support_types/ManagerSupportTypes';

const BASE = '/manager/support/tickets';

export const managerSupportApi = {
  fetchTickets: () =>
    apiFetch<ApiResponse<ManagerSupportTicket[]>>(BASE),

  createTicket: (body: CreateSupportTicketPayload) =>
    apiFetch<ApiResponse<ManagerSupportTicket>>(BASE, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
