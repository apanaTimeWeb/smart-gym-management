import { z } from 'zod';

import { BackgroundJobSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsSchema';

export const SuperadminJobsListDataSchema = z.array(BackgroundJobSchema);
export const SuperadminJobsRetryAllDataSchema = z.object({ queuedCount: z.number().nonnegative() });
export const SuperadminJobsNullDataSchema = z.null();
