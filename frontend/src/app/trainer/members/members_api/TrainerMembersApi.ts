// RESPONSIBILITY: Provides isolated data fetching methods for the members module, mocking API responses.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Member, MemberStats } from '../members_types/members_types';
import { MemberListResponseSchema, MemberStatsResponseSchema, MemberDetailResponseSchema } from '../members_types/members.schema';
import { MembersUrlConfig } from '../members_url_config';
import type { TrainerMemberDietSnapshot } from '../members_types/TrainerMemberDietSnapshot';
import type { TrainerMemberWorkoutSnapshot } from '../members_types/TrainerMemberWorkoutSnapshot';

export const TrainerMembersApi = {
  fetchMembers: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await apiFetch<ApiResponse<any>>(`${MembersUrlConfig.BACKEND_API.BASE}${q}`);
    return MemberListResponseSchema.parse(response);
  },
  
  fetchMemberById: async (id: string) => {
    const response = await apiFetch<ApiResponse<any>>(MembersUrlConfig.BACKEND_API.GET_ONE(id));
    return MemberDetailResponseSchema.parse(response);
  },
  
  fetchMemberStats: async () => {
    const response = await apiFetch<ApiResponse<any>>(MembersUrlConfig.BACKEND_API.STATS);
    return MemberStatsResponseSchema.parse(response);
  },
  
  updateMember: async (id: string, body: Partial<Member>) => {
    const response = await apiFetch<ApiResponse<any>>(MembersUrlConfig.BACKEND_API.UPDATE(id), {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    return MemberDetailResponseSchema.parse(response);
  },
  
  assignDiet: async (memberId: string, diet: TrainerMemberDietSnapshot | null) => {
    return TrainerMembersApi.updateMember(memberId, { assignedDietId: diet?.id, assignedDiet: diet ?? undefined });
  },
  
  assignWorkout: async (memberId: string, workout: TrainerMemberWorkoutSnapshot | null) => {
    return TrainerMembersApi.updateMember(memberId, { assignedWorkoutId: workout?.id, assignedWorkout: workout ?? undefined });
  },
  
  fetchMemberAttendance: async (memberId: string) => {
    // We will keep this basic as it is not mocked via MSW yet, but eventually should be
    // Using apiFetch requires an endpoint. For now, we will create a dummy fetch if no endpoint exists, or create a mock.
    // Wait, the original was mocking it inline. I'll make it fetch from an MSW route `/trainer/members/:id/attendance`.
    const response = await apiFetch<ApiResponse<any>>(`${MembersUrlConfig.BACKEND_API.GET_ONE(memberId)}/attendance`);
    return response; // No schema for this yet
  }
};
