import { z } from 'zod';

export const GrievanceStatusSchema = z.enum(['OPEN', 'RESOLVING', 'CLOSED']);
export type GrievanceStatus = z.infer<typeof GrievanceStatusSchema>;

export const GrievanceCategorySchema = z.enum(['HYGIENE', 'STAFF_BEHAVIOUR', 'EQUIPMENT', 'OTHER']);
export type GrievanceCategory = z.infer<typeof GrievanceCategorySchema>;

export const GrievanceTicketSchema = z.object({
  id: z.string(),
  memberName: z.string(),
  category: GrievanceCategorySchema,
  issue: z.string(),
  status: GrievanceStatusSchema,
  loggedAt: z.string(),
  resolvedAt: z.string().optional(),
  resolutionNote: z.string().optional(),
});
export type GrievanceTicket = z.infer<typeof GrievanceTicketSchema>;

export const CreateGrievanceTicketSchema = z.object({
  memberName: z.string().min(1, 'Member name is required'),
  category: GrievanceCategorySchema,
  issue: z.string().min(1, 'Issue description is required'),
});
export type CreateGrievanceTicketPayload = z.infer<typeof CreateGrievanceTicketSchema>;
