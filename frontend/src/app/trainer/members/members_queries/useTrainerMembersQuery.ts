'use client';
// RESPONSIBILITY: Custom hook for fetching Trainer members list using TanStack Query.
import { useQuery } from '@tanstack/react-query';
import { TrainerMembersApi } from '@/app/trainer/members/members_api/TrainerMembersApi';

export interface TrainerMembersQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
  progressStatus?: string;
  sortBy?: string;
  sortDirection?: string;
}

/** Owns useTrainerMembersQuery behavior for this Trainer module. */
export function useTrainerMembersQuery(params: TrainerMembersQueryParams) {
  return useQuery({
    queryKey: ['trainer', 'members', 'list', params],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMembers(params as Record<string, string>);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/** Owns useTrainerMemberStatsQuery behavior for this Trainer module. */
export function useTrainerMemberStatsQuery() {
  return useQuery({
    queryKey: ['trainer', 'members', 'stats'],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberStats();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/** Owns useTrainerMemberAttendanceQuery behavior for this Trainer module. */
export function useTrainerMemberAttendanceQuery(memberId: string) {
  return useQuery({
    queryKey: ['trainer', 'members', 'attendance', memberId],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberAttendance(memberId);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    enabled: !!memberId,
    staleTime: 5 * 60 * 1000,
  });
}

/** Owns useTrainerMemberDietPlansQuery behavior for this Trainer module. */
export function useTrainerMemberDietPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['trainer', 'members', 'diet-plans'],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchDietPlans();
      if (!response.success) throw new Error(response.message);
      return response.data?.dietPlans ?? [];
    },
    enabled,
  });
}

/** Owns useTrainerMemberWorkoutPlansQuery behavior for this Trainer module. */
export function useTrainerMemberWorkoutPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['trainer', 'members', 'workout-plans'],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchWorkoutPlans();
      if (!response.success) throw new Error(response.message);
      return response.data?.workouts ?? [];
    },
    enabled,
  });
}

/** Owns useTrainerMemberProgressEntriesQuery behavior for this Trainer module. */
export function useTrainerMemberProgressEntriesQuery(memberId: string) {
  return useQuery({
    queryKey: ['trainer', 'members', 'progress', memberId],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberProgressEntries(memberId);
      if (!response.success) throw new Error(response.message);
      return response.data ?? [];
    },
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
}
