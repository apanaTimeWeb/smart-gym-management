import type { GrievanceStatusSchema, GrievanceCategorySchema, GrievanceTicketSchema, CreateGrievanceTicketSchema } from '@/app/frontend_manager/manager_grievance/manager_grievance_schemas/ManagerGrievanceSchemas';
import type { ApiResponse } from '@/lib/api';
import type { z } from 'zod';


export type GrievanceStatus = z.infer<typeof GrievanceStatusSchema>;
export type GrievanceCategory = z.infer<typeof GrievanceCategorySchema>;
export type GrievanceTicket = z.infer<typeof GrievanceTicketSchema>;
export type GrievanceMutationResponse = ApiResponse<GrievanceTicket>;
export type CreateGrievanceTicketPayload = z.infer<typeof CreateGrievanceTicketSchema>;
