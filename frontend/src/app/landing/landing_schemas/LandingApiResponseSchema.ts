// RESPONSIBILITY: Validates the standardized null-data API response envelope consumed by Landing mutations.
import { z } from 'zod';

export const LandingNullApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.null(),
  meta: z.record(z.string(), z.unknown()).optional(),
  error: z.string().optional(),
  errorCode: z.string().optional(),
  statusCode: z.number().optional(),
  validationErrors: z.array(z.object({ field: z.string(), message: z.string() })).optional(),
}).passthrough();
