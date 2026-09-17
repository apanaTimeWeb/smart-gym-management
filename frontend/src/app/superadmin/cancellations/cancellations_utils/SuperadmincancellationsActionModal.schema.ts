import { z } from 'zod';
export const cancellationsActionSchema = z.object({
    status: z.enum(['PENDING', 'CONTACTED', 'RESOLVED', 'CANCELLED']),
    notes: z.string().max(500, 'Notes cannot exceed 500 characters'),
});
export type CancellationsActionFormValues = z.infer<typeof cancellationsActionSchema>;
