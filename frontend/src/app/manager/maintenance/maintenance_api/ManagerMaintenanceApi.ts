import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { MaintenanceTicketSchema, type MaintenanceTicket, type CreateMaintenanceTicketPayload } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';
import { MaintenanceUrlConfig } from '@/app/manager/maintenance/maintenance_url_config';

export const ManagerMaintenanceApi = {
  getTickets: async (): Promise<MaintenanceTicket[]> => {
    return apiFetch<ApiResponse<MaintenanceTicket[]>>(MaintenanceUrlConfig.BACKEND_API.BASE, {
      dataSchema: z.array(MaintenanceTicketSchema),
    }).then(res => res.data || []);
  },
  createTicket: async (payload: CreateMaintenanceTicketPayload): Promise<MaintenanceTicket> => {
    return apiFetch<ApiResponse<MaintenanceTicket>>(MaintenanceUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(payload),
      dataSchema: MaintenanceTicketSchema,
    }).then(res => res.data!);
  },
  resolveTicket: async (id: string): Promise<MaintenanceTicket> => {
    return apiFetch<ApiResponse<MaintenanceTicket>>(`${MaintenanceUrlConfig.BACKEND_API.BASE}/${id}/resolve`, {
      method: 'POST',
      dataSchema: MaintenanceTicketSchema,
    }).then(res => res.data!);
  }
};
