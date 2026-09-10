import { z } from 'zod';

export const churnActionSchema = z.object({
  status: z.enum(['PENDING', 'CONTACTED', 'RESOLVED', 'CHURNED']),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters'),
});

export type ChurnActionFormValues = z.infer<typeof churnActionSchema>;
