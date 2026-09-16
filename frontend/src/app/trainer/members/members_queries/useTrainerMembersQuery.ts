// RESPONSIBILITY: Custom hook for fetching Trainer members list using TanStack Query.
import { useQuery } from '@tanstack/react-query';
import { TrainerMembersApi } from '@/app/trainer/members/members_api/TrainerMembersApi';

interface MembersQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
  progressStatus?: string;
}

export function useTrainerMembersQuery(params: MembersQueryParams) {
  return useQuery({
    queryKey: ['trainer', 'members', 'list', params],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMembers(params as Record<string, string>);
      if (!response.success) throw new Error(response.message || 'Failed to fetch members');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTrainerMemberStatsQuery() {
  return useQuery({
    queryKey: ['trainer', 'members', 'stats'],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberStats();
      if (!response.success) throw new Error(response.message || 'Failed to fetch member stats');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrainerMemberAttendanceQuery(memberId: string) {
  return useQuery({
    queryKey: ['trainer', 'members', 'attendance', memberId],
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberAttendance(memberId);
      if (!response.success) throw new Error(response.message || 'Failed to fetch attendance');
      return response.data;
    },
    enabled: !!memberId,
    staleTime: 5 * 60 * 1000,
  });
}
