'use client';
// DATA FLOW: Assign-workout UI → ManagerMembersWorkoutPlansQuery → ManagerMembersApi → TanStack Query → profile view.
import { useQuery } from '@tanstack/react-query';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';

/** Loads available workout-plan snapshots only while the assignment panel is open. */
export function useManagerMembersWorkoutPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['manager', 'members', 'workout-plans'],
    queryFn: () => membersApi.fetchMemberWorkouts(),
    enabled,
  });
}
