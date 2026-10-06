import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { CreateMaintenanceTicketRequestSchema, CreateMaintenanceTicketSchema, MaintenanceTicketSchema } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_schemas/ManagerMaintenanceSchemas';
import { ManagerMaintenanceUrlConfig } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_url_config';
import type { CreateMaintenanceTicketPayload, MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes';
import type { ApiResponse } from '@/lib/api';

/**
 * @description Provides maintenance list/create/resolve API operations through the canonical Manager API transport.
 * @dependencies Uses apiFetch, module URL/schema/type contracts, and the shared minor-unit conversion helper.
 * @edge-case Validates response data at the API boundary and generates request payloads in the backend minor-unit contract before mutation submission.
 */
export const ManagerMaintenanceApi = {
  fetchMaintenanceIssues: async (): Promise<ApiResponse<MaintenanceTicket[]>> => apiFetch<ApiResponse<MaintenanceTicket[]>>(
    ManagerMaintenanceUrlConfig.BACKEND_API.BASE,
    { dataSchema: z.array(MaintenanceTicketSchema) },
  ),

  createMaintenanceTicket: async (
    payload: CreateMaintenanceTicketPayload,
    idempotencyKey: string,
  ): Promise<ApiResponse<MaintenanceTicket>> => {
    const validatedPayload = CreateMaintenanceTicketSchema.parse(payload);
    const requestPayload = CreateMaintenanceTicketRequestSchema.parse({
      ...validatedPayload,
      ...(validatedPayload.estimatedCost === undefined
        ? {}
        : { estimatedCost: toManagerMinorUnits(validatedPayload.estimatedCost) }),
    });

    return apiFetch<ApiResponse<MaintenanceTicket>>(ManagerMaintenanceUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(requestPayload),
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: MaintenanceTicketSchema,
    });
  },

  resolveMaintenanceTicket: async (
    id: string,
    idempotencyKey: string,
  ): Promise<ApiResponse<MaintenanceTicket>> => apiFetch<ApiResponse<MaintenanceTicket>>(
    ManagerMaintenanceUrlConfig.BACKEND_API.RESOLVE(id),
    {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: MaintenanceTicketSchema,
    },
  ),
};
