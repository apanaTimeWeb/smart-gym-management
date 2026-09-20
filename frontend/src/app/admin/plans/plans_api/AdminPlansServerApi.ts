// RESPONSIBILITY: Server-side Plans fetch with the same validated contract as the client API.
import { ssrApiFetch } from '@/lib/server-api';
import { PlansUrlConfig } from '@/app/admin/plans/admin_plans_url_config';
import type { Plan } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import type { ApiResponse } from '@/lib/api';


export const ssrPlansApi = {
  fetchAllPlans: () => ssrApiFetch<ApiResponse<Plan[]>>(PlansUrlConfig.BACKEND_API.BASE),
};
