// RESPONSIBILITY: Modularized API client for the Tickets module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SupportTicket } from '@/app/superadmin/tickets/tickets_types/tickets_types';

export const ticketsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SupportTicket[]>>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}${q}`);
  },
  getOne: (id: string) => apiFetch<ApiResponse<SupportTicket>>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`),
  update: (id: string, body: Partial<SupportTicket>) => apiFetch<ApiResponse<SupportTicket>>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
};
