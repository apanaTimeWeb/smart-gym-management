// RESPONSIBILITY: Encapsulates functionality for superadmin_jobs_types.ts
import { z } from 'zod';
export const BackgroundJobSchema = z.object({
  id: z.string(),
  queueName: z.string(),
  jobName: z.string(),
  status: z.enum(['ACTIVE', 'COMPLETED', 'FAILED', 'DELAYED']),
  attempts: z.number(),
  error: z.string().optional(),
  createdAt: z.string(),
});
export type BackgroundJob = z.infer<typeof BackgroundJobSchema>;

export const JobsMetricsSchema = z.object({
  activeJobs: z.number(),
  completed24h: z.number(),
  failed24h: z.number(),
  delayed: z.number(),
});
export type JobsMetrics = z.infer<typeof JobsMetricsSchema>;

