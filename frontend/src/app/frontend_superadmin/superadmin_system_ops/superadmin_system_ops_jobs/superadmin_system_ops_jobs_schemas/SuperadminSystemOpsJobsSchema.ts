import { z } from 'zod';

export const BackgroundJobSchema = z.object({
    id: z.string(),
    queueName: z.string(),
    jobName: z.string(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'FAILED', 'DELAYED', 'CANCELLED']),
    attempts: z.number(),
    error: z.string().optional(),
    createdAt: z.string(),
});

export const JobsMetricsSchema = z.object({
    activeJobs: z.number(),
    completed24h: z.number(),
    failed24h: z.number(),
    delayed: z.number(),
});
