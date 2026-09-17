// RESPONSIBILITY: Server-side API fetching for the plans module.
import { ssrApiFetch } from '@/lib/server-api';
import { PlansUrlConfig } from '@/app/admin/plans/admin_plans_url_config';
import type { Plan } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import { planSchema } from '@/app/admin/plans/plans_types/AdminPlansSchemas';
import type { ApiResponse } from '@/lib/api';

export const ssrPlansApi = {
  getAll: () => ssrApiFetch<ApiResponse<Plan[]>>(PlansUrlConfig.BACKEND_API.BASE),
};
