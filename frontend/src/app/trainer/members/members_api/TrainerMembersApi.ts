// RESPONSIBILITY: Provides all network access required by the Members module, including member-profile supporting data.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Member } from '@/app/trainer/members/members_types/TrainerMembers_types';
import { MemberListResponseSchema, MemberStatsResponseSchema, MemberDetailResponseSchema } from '@/app/trainer/members/members_types/TrainerMembers.schema';
import { MembersUrlConfig } from '@/app/trainer/Trainer_url_config';
import { TrainerMemberAttendanceResponseSchema, TrainerMemberDietPlansResponseSchema, TrainerMemberProgressEntriesResponseSchema, TrainerMemberWorkoutPlansResponseSchema } from '@/app/trainer/members/members_types/TrainerMembersProfileData.schema';
import type { TrainerMemberDietSnapshot } from '@/app/trainer/members/members_types/TrainerMemberDietSnapshot';
import type { TrainerMemberWorkoutSnapshot } from '@/app/trainer/members/members_types/TrainerMemberWorkoutSnapshot';

export const TrainerMembersApi = {
  fetchMembers: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await apiFetch<ApiResponse<unknown>>(`${MembersUrlConfig.BACKEND_API.BASE}${q}`);
    return MemberListResponseSchema.parse(response);
  },
  fetchMemberById: async (id: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(MembersUrlConfig.BACKEND_API.GET_ONE(id));
    return MemberDetailResponseSchema.parse(response);
  },
  fetchMemberStats: async () => {
    const response = await apiFetch<ApiResponse<unknown>>(MembersUrlConfig.BACKEND_API.STATS);
    return MemberStatsResponseSchema.parse(response);
  },
  updateMember: async (id: string, body: Partial<Member>) => {
    const response = await apiFetch<ApiResponse<unknown>>(MembersUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) });
    return MemberDetailResponseSchema.parse(response);
  },
  assignDiet: async (memberId: string, diet: TrainerMemberDietSnapshot | null) => TrainerMembersApi.updateMember(memberId, { assignedDietId: diet?.id, assignedDiet: diet ?? undefined }),
  assignWorkout: async (memberId: string, workout: TrainerMemberWorkoutSnapshot | null) => TrainerMembersApi.updateMember(memberId, { assignedWorkoutId: workout?.id, assignedWorkout: workout ?? undefined }),
  fetchMemberAttendance: async (memberId: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(MembersUrlConfig.BACKEND_API.ATTENDANCE(memberId));
    return TrainerMemberAttendanceResponseSchema.parse(response);
  },
  fetchDietPlans: async () => {
    const response = await apiFetch<ApiResponse<unknown>>(MembersUrlConfig.BACKEND_API.DIET_PLANS);
    return TrainerMemberDietPlansResponseSchema.parse(response);
  },
  fetchWorkoutPlans: async () => {
    const response = await apiFetch<ApiResponse<unknown>>(MembersUrlConfig.BACKEND_API.WORKOUT_PLANS);
    return TrainerMemberWorkoutPlansResponseSchema.parse(response);
  },
  fetchMemberProgressEntries: async (memberId: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(MembersUrlConfig.BACKEND_API.PROGRESS_ENTRIES(memberId));
    return TrainerMemberProgressEntriesResponseSchema.parse(response);
  },
};
