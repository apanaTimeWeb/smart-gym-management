"use client";
// RESPONSIBILITY: Reads the selected member entity from TanStack Query using the UI-only selected member ID.
// DATA FLOW: selectedMemberId (Zustand) → TrainerMembersApi.fetchMemberById → TanStack Query → profile UI.
import { useQuery } from '@tanstack/react-query';

import { TrainerMembersApi } from '@/app/frontend_trainer/trainer_members/trainer_members_api/TrainerMembersApi';

import { TRAINER_MEMBERS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_members/trainer_members_constants/TrainerMembersQueryKeys';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/trainer_members_store/useTrainerMembersStore';






/**
 * @description Reads the selected member entity from TanStack Query using the UI-only selected member ID.
 * @dependencies selectedMemberId (Zustand) → TrainerMembersApi.fetchMemberById → TanStack Query → profile UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerMembersSelectedMember state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerMembersSelectedMember() {
  const memberId = useTrainerMembersStore((state) => state.selectedMemberId);
  const query = useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.detail(memberId as string),
    queryFn: () => TrainerMembersApi.fetchMemberById(memberId as string),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
  return { memberId, member: query.data?.data ?? null, ...query };
}
