// RESPONSIBILITY: Server-side API fetching for the plans module.
import { ssrApiFetch } from '@/lib/server-api';
import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import type { ApiResponse } from '@/lib/api';

export const ssrPlansApi = {
  fetchPlans: () => ssrApiFetch<ApiResponse<Plan[]>>(ManagerPlansUrlConfig.BACKEND_API.BASE) };
