// RESPONSIBILITY: Owns all Grievance Zod runtime validation schemas and their inferred schema contracts.
import { z } from 'zod';

/**
 * @description Provides the ManagerGrievanceSchemas implementation for the grievance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const GrievanceStatusSchema = z.enum(['OPEN', 'RESOLVING', 'CLOSED']);
export const GrievanceCategorySchema = z.enum(['HYGIENE', 'STAFF_BEHAVIOUR', 'EQUIPMENT', 'OTHER']);
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
export const CreateGrievanceTicketSchema = z.object({
  memberName: z.string().min(1, 'Member name is required'),
  category: GrievanceCategorySchema,
  issue: z.string().min(1, 'Issue description is required'),
});
