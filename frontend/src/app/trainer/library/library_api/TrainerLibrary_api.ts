// RESPONSIBILITY: Provides strongly typed network calls for the Trainer Diet Library feature.
// DATA FLOW: Library URL contract → apiFetch → canonical response schema → TanStack Query/UI.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { LibraryUrlConfig } from '@/app/trainer/library/library_url_config';
import { TrainerLibraryDietPlansResponseSchema, TrainerLibraryAssignedMembersResponseSchema, TrainerLibraryMutationResponseSchema } from '@/app/trainer/library/library_types/TrainerLibraryApiSchema';

export const libraryApi = {
  fetchDietPlans: async (params?: Record<string, string>) => {
    const query = params ? new URLSearchParams(params).toString() : '';
    const url = query ? `${LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}?${query}` : LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE;
    const raw = await apiFetch<ApiResponse<unknown>>(url);
    const response = TrainerLibraryDietPlansResponseSchema.parse(raw);
    return { data: response.data ?? { dietPlans: [], total: 0 }, message: response.message };
  },
  fetchAssignedMembers: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(LibraryUrlConfig.BACKEND_API.ASSIGNED_MEMBERS);
    return TrainerLibraryAssignedMembersResponseSchema.parse(raw).data ?? [];
  },
  assignDietPlan: async (memberId: string, dietPlanId: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(LibraryUrlConfig.BACKEND_API.ASSIGN_DIET(memberId), {
      method: 'PATCH', body: JSON.stringify({ dietPlanId }), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = TrainerLibraryMutationResponseSchema.parse(raw);
    return { data: response.data, message: response.message };
  },
};
