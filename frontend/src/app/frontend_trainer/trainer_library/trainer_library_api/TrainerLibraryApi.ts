// RESPONSIBILITY: Provides strongly typed network calls for the Trainer Diet Library feature.
// DATA FLOW: Library URL contract → apiFetch → canonical response schema → TanStack Query/UI.
import { apiFetch } from '@/lib/api';

import { TrainerLibraryDietPlansResponseSchema, TrainerLibraryAssignedMembersResponseSchema, TrainerLibraryMutationResponseSchema } from '@/app/frontend_trainer/trainer_library/trainer_library_schemas/TrainerLibraryApiSchema';

import { TRAINER_LIBRARY_URLS } from '@/app/frontend_trainer/trainer_library/trainer_library_url_config';

import type { ApiResponse } from '@/lib/api';






export const TrainerLibraryApi = {
  fetchDietPlans: async (params?: Record<string, string>) => {
    const query = params ? new URLSearchParams(params).toString() : '';
    const url = query ? `${TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE}?${query}` : TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE;
    const raw = await apiFetch<ApiResponse<unknown>>(url);
    const response = TrainerLibraryDietPlansResponseSchema.parse(raw);
    if (!response.data) throw new Error(response.message);
    return { data: response.data, message: response.message };
  },
  fetchAssignedMembers: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_LIBRARY_URLS.API.ASSIGNED_MEMBERS);
    const response = TrainerLibraryAssignedMembersResponseSchema.parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
  assignDietPlan: async (memberId: string, dietPlanId: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_LIBRARY_URLS.API.ASSIGN_DIET(memberId), {
      method: 'PATCH', body: JSON.stringify({ dietPlanId }), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = TrainerLibraryMutationResponseSchema.parse(raw);
    return { data: response.data, message: response.message };
  },
};
