// RESPONSIBILITY: Server-side API fetching for the library module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { LibraryUrlConfig } from '@/app/trainer/Trainer_url_config';
import type { DietPlan } from '@/app/trainer/library/library_types/TrainerLibrary_types';

export const ssrLibraryApi = {
  getDietPlans: () => ssrApiFetch<ApiResponse<{ dietPlans: DietPlan[]; total: number }>>(LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE),
};

