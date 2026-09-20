// RESPONSIBILITY: Provides strongly-typed network calls for the library module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { LibraryUrlConfig } from '@/app/trainer/library/library_url_config';
import type { DietPlan } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import { TrainerLibraryDietPlansResponseSchema, TrainerLibraryAssignedMembersResponseSchema, TrainerLibraryMutationResponseSchema } from '@/app/trainer/library/library_types/TrainerLibraryApiSchema';

export const libraryApi = {
  // Trainers can read diet plans and assign them â€” create/update/delete are Manager-only.
  fetchDietPlans: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const raw = await apiFetch<ApiResponse<unknown>>(`${LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${q}`);
    const response = TrainerLibraryDietPlansResponseSchema.parse(raw);
    return response.data ?? { dietPlans: [], total: 0 }; 
  },
  fetchAssignedMembers: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(LibraryUrlConfig.BACKEND_API.ASSIGNED_MEMBERS);
    return TrainerLibraryAssignedMembersResponseSchema.parse(raw).data;
  },
  assignDietPlan: (memberId: string, dietPlanId: string) =>
    apiFetch<ApiResponse<unknown>>(LibraryUrlConfig.BACKEND_API.ASSIGN_DIET(memberId), { method: 'PATCH', body: JSON.stringify({ dietPlanId }) }).then((raw) => { TrainerLibraryMutationResponseSchema.parse(raw); }),
};

