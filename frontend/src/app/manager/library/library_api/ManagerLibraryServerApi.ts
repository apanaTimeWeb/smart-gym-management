// RESPONSIBILITY: Server-side API fetching for the library module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { ManagerLibraryUrlConfig } from '@/app/manager/library/library_url_config';
import type { DietPlan } from '@/app/manager/library/library_types/ManagerLibraryTypes';

export const ssrLibraryApi = {

  fetchDietPlans: () => ssrApiFetch<ApiResponse<{ dietPlans: DietPlan[]; total: number }>>(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE) };
