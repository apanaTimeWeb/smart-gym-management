// RESPONSIBILITY: Provides all network access required by the Members module, including member-profile supporting data.
import { apiFetch } from '@/lib/api';

import { TrainerMembersMemberDetailResponseSchema } from '@/app/frontend_trainer/trainer_members/trainer_members_schemas/TrainerMembersDomainSchemas';

import { TrainerMembersMemberListResponseSchema } from '@/app/frontend_trainer/trainer_members/trainer_members_schemas/TrainerMembersDomainSchemas';

import { TrainerMembersMemberStatsResponseSchema } from '@/app/frontend_trainer/trainer_members/trainer_members_schemas/TrainerMembersDomainSchemas';

import { TrainerMembersTrainerMemberAttendanceResponseSchema, TrainerMembersTrainerMemberDietPlansResponseSchema, TrainerMembersTrainerMemberProgressEntriesResponseSchema, TrainerMembersTrainerMemberWorkoutPlansResponseSchema } from '@/app/frontend_trainer/trainer_members/trainer_members_schemas/TrainerMembersProfileDataSchemas';

import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/trainer_members_url_config';

import type { TrainerMembersDietSnapshot } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersDietSnapshot';

import type { TrainerMembersCreateMemberNote } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersNoteTypes';

import type { TrainerMembersMember } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersTypes';

import type { TrainerMembersTrainerMemberAssessment } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersTypes';

import type { TrainerMembersWorkoutSnapshot } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersWorkoutSnapshot';

import type { ApiResponse } from '@/lib/api';

export const TrainerMembersApi = {
  fetchMembers: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await apiFetch<ApiResponse<unknown>>(`${TRAINER_MEMBERS_URLS.API.BASE}${q}`);
    return TrainerMembersMemberListResponseSchema.parse(response);
  },
  fetchMemberById: async (id: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.GET_ONE(id));
    return TrainerMembersMemberDetailResponseSchema.parse(response);
  },
  fetchMemberStats: async () => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.STATS);
    return TrainerMembersMemberStatsResponseSchema.parse(response);
  },
  updateMember: async (id: string, body: Partial<TrainerMembersMember>, idempotencyKey: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey }
    });
    return TrainerMembersMemberDetailResponseSchema.parse(response);
  },
  updateMemberAssessment: async (id: string, assessment: TrainerMembersTrainerMemberAssessment, idempotencyKey: string) => {
    return TrainerMembersApi.updateMember(id, { assessment }, idempotencyKey);
  },
  assignDiet: async (memberId: string, diet: TrainerMembersDietSnapshot | null, idempotencyKey: string) => TrainerMembersApi.updateMember(memberId, { assignedDietId: diet?.id, assignedDiet: diet ?? undefined }, idempotencyKey),
  assignWorkout: async (memberId: string, workout: TrainerMembersWorkoutSnapshot | null, idempotencyKey: string) => TrainerMembersApi.updateMember(memberId, { assignedWorkoutId: workout?.id, assignedWorkout: workout ?? undefined }, idempotencyKey),
  fetchMemberAttendance: async (memberId: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.ATTENDANCE(memberId));
    return TrainerMembersTrainerMemberAttendanceResponseSchema.parse(response);
  },
  fetchDietPlans: async () => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.DIET_PLANS);
    return TrainerMembersTrainerMemberDietPlansResponseSchema.parse(response);
  },
  fetchWorkoutPlans: async () => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.WORKOUT_PLANS);
    return TrainerMembersTrainerMemberWorkoutPlansResponseSchema.parse(response);
  },
  addMemberNote: async (memberId: string, body: TrainerMembersCreateMemberNote, idempotencyKey: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.NOTES(memberId), { method: 'POST', body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey }
    });
    return TrainerMembersMemberDetailResponseSchema.parse(response);
  },
  fetchMemberProgressEntries: async (memberId: string) => {
    const response = await apiFetch<ApiResponse<unknown>>(TRAINER_MEMBERS_URLS.API.PROGRESS_ENTRIES(memberId));
    return TrainerMembersTrainerMemberProgressEntriesResponseSchema.parse(response);
  },
};
