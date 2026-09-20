import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { GrievanceTicketSchema, type GrievanceTicket, type CreateGrievanceTicketPayload } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';
import { GrievanceUrlConfig } from '@/app/manager/grievance/grievance_url_config';

export const ManagerGrievanceApi = {
  getTickets: async (): Promise<GrievanceTicket[]> => {
    return apiFetch<ApiResponse<GrievanceTicket[]>>(GrievanceUrlConfig.BACKEND_API.BASE, {
      dataSchema: z.array(GrievanceTicketSchema),
    }).then(res => res.data || []);
  },
  createTicket: async (payload: CreateGrievanceTicketPayload): Promise<GrievanceTicket> => {
    return apiFetch<ApiResponse<GrievanceTicket>>(GrievanceUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(payload),
      dataSchema: GrievanceTicketSchema,
    }).then(res => res.data!);
  },
  resolveTicket: async (id: string, resolutionNote: string): Promise<GrievanceTicket> => {
    return apiFetch<ApiResponse<GrievanceTicket>>(`${GrievanceUrlConfig.BACKEND_API.BASE}/${id}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ resolutionNote }),
      dataSchema: GrievanceTicketSchema,
    }).then(res => res.data!);
  }
};
