import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { GrievanceTicketSchema } from '@/app/frontend_manager/manager_grievance/manager_grievance_schemas/ManagerGrievanceSchemas';
import { ManagerGrievanceUrlConfig } from '@/app/frontend_manager/manager_grievance/manager_grievance_url_config';
import type { GrievanceTicket, CreateGrievanceTicketPayload } from '@/app/frontend_manager/manager_grievance/manager_grievance_types/ManagerGrievanceTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerGrievanceApi implementation for the grievance module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_grievance/manager_grievance_schemas/ManagerGrievanceSchemas; @/app/frontend_manager/manager_grievance/manager_grievance_url_config; @/app/frontend_manager/manager_grievance/manager_grievance_types/ManagerGrievanceTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerGrievanceApi = {
  fetchGrievanceTickets: async (): Promise<ApiResponse<GrievanceTicket[]>> => apiFetch<ApiResponse<GrievanceTicket[]>>(ManagerGrievanceUrlConfig.BACKEND_API.BASE, {
    dataSchema: z.array(GrievanceTicketSchema),
  }),
  createGrievanceTicket: async (payload: CreateGrievanceTicketPayload, idempotencyKey: string): Promise<ApiResponse<GrievanceTicket>> => apiFetch<ApiResponse<GrievanceTicket>>(ManagerGrievanceUrlConfig.BACKEND_API.BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: GrievanceTicketSchema,
  }),
  resolveGrievanceTicket: async (id: string, resolutionNote: string, idempotencyKey: string): Promise<ApiResponse<GrievanceTicket>> => apiFetch<ApiResponse<GrievanceTicket>>(ManagerGrievanceUrlConfig.BACKEND_API.RESOLVE(id), {
    method: 'POST',
    body: JSON.stringify({ resolutionNote }),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: GrievanceTicketSchema,
  }),
};
