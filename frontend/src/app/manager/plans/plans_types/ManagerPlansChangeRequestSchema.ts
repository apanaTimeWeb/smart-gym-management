// RESPONSIBILITY: Runtime schemas for Manager plan-change request API responses.
import { z } from 'zod';

export const managerPlansChangeRequestResponseSchema = z.object({
  requestId: z.string(),
  status: z.literal('PENDING'),
});
