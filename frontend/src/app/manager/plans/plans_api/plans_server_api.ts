// RESPONSIBILITY: Server-side API fetching for the plans module.
import { ssrApiFetch } from '@/lib/server-api';
import { PlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import type { Plan } from '@/app/manager/plans/plans_types/plans_types';
import type { ApiResponse } from '@/lib/api';

export const ssrPlansApi = {
  getAll: () => ssrApiFetch<ApiResponse<Plan[]>>(PlansUrlConfig.BACKEND_API.BASE),
};
