'use client';
// RESPONSIBILITY: Reads the selected member entity from TanStack Query using the UI-only selected member ID.
// DATA FLOW: selectedMemberId (Zustand) → TrainerMembersApi.fetchMemberById → TanStack Query → profile UI.
import { useQuery } from '@tanstack/react-query';
import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { TrainerMembersApi } from '@/app/trainer/members/members_api/TrainerMembersApi';

/** Fetches the currently selected member so server data remains owned by TanStack Query. */
export function useTrainerSelectedMember() {
  const memberId = useTrainerMembersStore((state) => state.selectedMemberId);
  const query = useQuery({
    queryKey: ['trainer', 'members', 'detail', memberId],
    queryFn: () => TrainerMembersApi.fetchMemberById(memberId as string),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
  return { memberId, member: query.data?.data ?? null, ...query };
}
