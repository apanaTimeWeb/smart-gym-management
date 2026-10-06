import type { MaintenanceStatusSchema, MaintenancePrioritySchema, MaintenanceTicketSchema, CreateMaintenanceTicketSchema, CreateMaintenanceTicketRequestSchema } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_schemas/ManagerMaintenanceSchemas';
import type { ApiResponse } from '@/lib/api';
import type { z } from 'zod';


export type MaintenanceStatus = z.infer<typeof MaintenanceStatusSchema>;
export type MaintenancePriority = z.infer<typeof MaintenancePrioritySchema>;
export type MaintenanceTicket = z.infer<typeof MaintenanceTicketSchema>;
export type MaintenanceMutationResponse = ApiResponse<MaintenanceTicket>;
export type CreateMaintenanceTicketPayload = z.infer<typeof CreateMaintenanceTicketSchema>;
export type CreateMaintenanceTicketRequest = z.infer<typeof CreateMaintenanceTicketRequestSchema>;
