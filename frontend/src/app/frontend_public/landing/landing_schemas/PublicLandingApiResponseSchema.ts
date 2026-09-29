// RESPONSIBILITY: Validates the exact canonical API response envelope required by the frontend architecture contract.
import { z } from 'zod';

const PublicLandingFieldValidationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
}).strict();

const PublicLandingPaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
}).strict();

export const PublicLandingNullApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.null(),
  meta: PublicLandingPaginationMetaSchema.optional(),
  error: z.string().optional(),
  errorCode: z.string().optional(),
  statusCode: z.number().optional(),
  validationErrors: z.array(PublicLandingFieldValidationErrorSchema).optional(),
}).strict();
