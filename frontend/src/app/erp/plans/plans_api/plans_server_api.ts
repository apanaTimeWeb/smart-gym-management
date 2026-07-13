// RESPONSIBILITY: Server-side API fetching for the plans module.
import { ssrApiFetch } from '@/lib/server-api';
import { PlansUrlConfig } from '@/app/erp/plans/plans_url_config';
import type { Plan } from '@/app/erp/plans/plans_types/plans_types';

export const ssrPlansApi = {
  getAll: () => ssrApiFetch<{ success: boolean; data: Plan[] }>(PlansUrlConfig.BACKEND_API.BASE),
};
