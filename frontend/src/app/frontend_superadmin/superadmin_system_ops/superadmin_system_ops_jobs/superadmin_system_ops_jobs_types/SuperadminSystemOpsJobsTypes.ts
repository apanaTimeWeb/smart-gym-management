import type { infer as ZodInfer } from 'zod';
import { BackgroundJobSchema, JobsMetricsSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsSchema';
// RESPONSIBILITY: Encapsulates functionality for superadmin_jobs_types.ts
export type BackgroundJob = ZodInfer<typeof BackgroundJobSchema>;
export type JobsMetrics = ZodInfer<typeof JobsMetricsSchema>;

import { SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsFilterOptions';

export type SuperadminJobsStatusFilter = typeof SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS[number]['value'];
