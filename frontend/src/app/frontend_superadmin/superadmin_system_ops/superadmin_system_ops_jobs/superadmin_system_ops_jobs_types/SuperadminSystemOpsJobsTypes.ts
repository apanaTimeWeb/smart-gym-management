import { SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsFilterOptions';
import { BackgroundJobSchema, JobsMetricsSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsSchema';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Encapsulates functionality for superadmin_jobs_types.ts
export type BackgroundJob = ZodInfer<typeof BackgroundJobSchema>;
export type JobsMetrics = ZodInfer<typeof JobsMetricsSchema>;


export type SuperadminJobsStatusFilter = typeof SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS[number]['value'];
