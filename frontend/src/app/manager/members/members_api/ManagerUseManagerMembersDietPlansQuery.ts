'use client';
// DATA FLOW: Assign-diet UI → ManagerMembersDietPlansQuery → ManagerMembersApi → TanStack Query → profile view.
import { useQuery } from '@tanstack/react-query';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';

/** Loads available diet-plan snapshots only while the assignment panel is open. */
export function useManagerMembersDietPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['manager', 'members', 'diet-plans'],
    queryFn: () => membersApi.fetchMemberDietPlans(),
    enabled });
}
