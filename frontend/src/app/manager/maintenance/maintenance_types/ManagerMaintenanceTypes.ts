// RESPONSIBILITY: Defines Maintenance domain types; runtime validation schemas live in maintenance_schemas.
import {
  MaintenanceStatusSchema,
  MaintenancePrioritySchema,
  MaintenanceTicketSchema,
  CreateMaintenanceTicketSchema,
} from '@/app/manager/maintenance/maintenance_schemas/ManagerMaintenanceSchemas';
import type { ApiResponse } from '@/lib/api';
import type { z } from 'zod';


export type MaintenanceStatus = z.infer<typeof MaintenanceStatusSchema>;
export type MaintenancePriority = z.infer<typeof MaintenancePrioritySchema>;
export type MaintenanceTicket = z.infer<typeof MaintenanceTicketSchema>;
export type MaintenanceMutationResponse = ApiResponse<MaintenanceTicket>;
export type CreateMaintenanceTicketPayload = z.infer<typeof CreateMaintenanceTicketSchema>;
