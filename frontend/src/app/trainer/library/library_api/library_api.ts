// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Provides strongly-typed network calls for the library module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { LibraryUrlConfig } from '@/app/trainer/library/library_url_config';
import type { Exercise, DietPlan } from '@/app/trainer/trainer_types/trainer_types';

export const libraryApi = {
  // Trainers can read diet plans and assign them — create/update/delete are Manager-only.
  getDietPlans: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ dietPlans: DietPlan[]; total: number }>>(`${LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${q}`);
  },
  assignDietPlan: (memberId: string, dietPlanId: string) =>
    apiFetch<ApiResponse<void>>(LibraryUrlConfig.BACKEND_API.ASSIGN_DIET(memberId), { method: 'PATCH', body: JSON.stringify({ dietPlanId }) }),
};

