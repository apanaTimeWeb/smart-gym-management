// RESPONSIBILITY: Defines Grievance domain types; runtime validation schemas live in grievance_schemas.
import {
  GrievanceStatusSchema,
  GrievanceCategorySchema,
  GrievanceTicketSchema,
  CreateGrievanceTicketSchema,
} from '@/app/manager/grievance/grievance_schemas/ManagerGrievanceSchemas';
import type { ApiResponse } from '@/lib/api';
import type { z } from 'zod';


export type GrievanceStatus = z.infer<typeof GrievanceStatusSchema>;
export type GrievanceCategory = z.infer<typeof GrievanceCategorySchema>;
export type GrievanceTicket = z.infer<typeof GrievanceTicketSchema>;
export type GrievanceMutationResponse = ApiResponse<GrievanceTicket>;
export type CreateGrievanceTicketPayload = z.infer<typeof CreateGrievanceTicketSchema>;
