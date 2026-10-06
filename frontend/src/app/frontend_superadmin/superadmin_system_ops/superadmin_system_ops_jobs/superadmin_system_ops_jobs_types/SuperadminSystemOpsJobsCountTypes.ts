import { CountResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsCountSchema';

import type { infer as ZodInfer } from 'zod';


export type CountResponse = ZodInfer<typeof CountResponseSchema>;
