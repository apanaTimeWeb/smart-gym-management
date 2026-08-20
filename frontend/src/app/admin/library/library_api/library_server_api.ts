// RESPONSIBILITY: Server-side API fetching for the library module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { LibraryUrlConfig } from '@/app/admin/library/library_url_config';
import type { Exercise, DietPlan } from '@/app/admin/library/library_types/library_types';

export const ssrLibraryApi = {
  getExercises: () => ssrApiFetch<ApiResponse<{ exercises: Exercise[]; total: number }>>(LibraryUrlConfig.BACKEND_API.EXERCISES_BASE),
  getDietPlans: () => ssrApiFetch<ApiResponse<{ dietPlans: DietPlan[]; total: number }>>(LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE),
};
