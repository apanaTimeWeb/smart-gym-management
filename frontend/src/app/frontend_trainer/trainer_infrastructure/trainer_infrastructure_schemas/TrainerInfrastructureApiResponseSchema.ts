import { z } from 'zod';

// RESPONSIBILITY: Validates the canonical API response envelope for Trainer-owned API clients.
// DATA FLOW: HTTP JSON → TrainerInfrastructureApiResponseSchema → feature-specific response schema → query/UI.
const PaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

const ValidationErrorItemSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const TrainerInfrastructureApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.nullable(),
    meta: PaginationMetaSchema.optional(),
    error: z.string().optional(),
    errorCode: z.string().optional(),
    statusCode: z.number().int().optional(),
    validationErrors: z.array(ValidationErrorItemSchema).optional(),
  }).superRefine((response, context) => {
    if (!response.success) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['success'], message: response.message || 'Request failed.' });
    }
  });
