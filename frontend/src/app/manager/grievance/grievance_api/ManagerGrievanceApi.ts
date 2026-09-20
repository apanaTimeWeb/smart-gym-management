import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { GrievanceTicketSchema } from '@/app/manager/grievance/grievance_schemas/ManagerGrievanceSchemas';
import { ManagerGrievanceUrlConfig } from '@/app/manager/grievance/grievance_url_config';
import type { GrievanceTicket, CreateGrievanceTicketPayload } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';
import type { ApiResponse } from '@/lib/api';


export const ManagerGrievanceApi = {
  fetchGrievanceTickets: async (): Promise<ApiResponse<GrievanceTicket[]>> => apiFetch<ApiResponse<GrievanceTicket[]>>(ManagerGrievanceUrlConfig.BACKEND_API.BASE, {
    dataSchema: z.array(GrievanceTicketSchema),
  }),
  createGrievanceTicket: async (payload: CreateGrievanceTicketPayload): Promise<ApiResponse<GrievanceTicket>> => apiFetch<ApiResponse<GrievanceTicket>>(ManagerGrievanceUrlConfig.BACKEND_API.BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    dataSchema: GrievanceTicketSchema,
  }),
  resolveGrievanceTicket: async (id: string, resolutionNote: string): Promise<ApiResponse<GrievanceTicket>> => apiFetch<ApiResponse<GrievanceTicket>>(ManagerGrievanceUrlConfig.BACKEND_API.RESOLVE(id), {
    method: 'POST',
    body: JSON.stringify({ resolutionNote }),
    dataSchema: GrievanceTicketSchema,
  }),
};
