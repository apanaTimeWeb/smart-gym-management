import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { MaintenanceTicketSchema } from '@/app/manager/maintenance/maintenance_schemas/ManagerMaintenanceSchemas';
import { ManagerMaintenanceUrlConfig } from '@/app/manager/maintenance/maintenance_url_config';
import type { MaintenanceTicket, CreateMaintenanceTicketPayload } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';
import type { ApiResponse } from '@/lib/api';


export const ManagerMaintenanceApi = {
  fetchMaintenanceIssues: async (): Promise<ApiResponse<MaintenanceTicket[]>> => apiFetch<ApiResponse<MaintenanceTicket[]>>(ManagerMaintenanceUrlConfig.BACKEND_API.BASE, {
    dataSchema: z.array(MaintenanceTicketSchema),
  }),
  createMaintenanceTicket: async (payload: CreateMaintenanceTicketPayload): Promise<ApiResponse<MaintenanceTicket>> => apiFetch<ApiResponse<MaintenanceTicket>>(ManagerMaintenanceUrlConfig.BACKEND_API.BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    dataSchema: MaintenanceTicketSchema,
  }),
  resolveMaintenanceTicket: async (id: string): Promise<ApiResponse<MaintenanceTicket>> => apiFetch<ApiResponse<MaintenanceTicket>>(ManagerMaintenanceUrlConfig.BACKEND_API.RESOLVE(id), {
    method: 'POST',
    dataSchema: MaintenanceTicketSchema,
  }),
};
