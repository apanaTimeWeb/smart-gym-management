import { z } from 'zod';

export const MaintenanceStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']);
export type MaintenanceStatus = z.infer<typeof MaintenanceStatusSchema>;

export const MaintenancePrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export type MaintenancePriority = z.infer<typeof MaintenancePrioritySchema>;

export const MaintenanceTicketSchema = z.object({
  id: z.string(),
  title: z.string(),
  equipment: z.string(),
  status: MaintenanceStatusSchema,
  priority: MaintenancePrioritySchema,
  assignedVendor: z.string().optional(),
  estimatedCost: z.number().optional(),
  reportedAt: z.string(),
  resolvedAt: z.string().optional(),
});
export type MaintenanceTicket = z.infer<typeof MaintenanceTicketSchema>;

export const CreateMaintenanceTicketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  priority: MaintenancePrioritySchema,
  estimatedCost: z.number().optional(),
});
export type CreateMaintenanceTicketPayload = z.infer<typeof CreateMaintenanceTicketSchema>;
