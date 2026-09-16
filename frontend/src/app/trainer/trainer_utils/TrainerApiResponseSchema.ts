import { z } from 'zod';

// RESPONSIBILITY: Validates the canonical API response envelope for Trainer-owned API clients.
// DATA FLOW: HTTP JSON → TrainerApiResponseSchema → feature-specific response schema → query/UI.
const PaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const createTrainerApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.nullable(),
    meta: PaginationMetaSchema.optional(),
    error: z.unknown().optional(),
    statusCode: z.number().optional(),
  });
