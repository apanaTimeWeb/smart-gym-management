// RESPONSIBILITY: Custom hook for Trainer member mutations using TanStack Query.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrainerMembersApi } from '@/app/trainer/members/members_api/TrainerMembersApi';
import type { Member, DietPlan, Workout } from '@/app/trainer/members/members_types/TrainerMembers_types';

export function useTrainerMembersMutations() {
  const queryClient = useQueryClient();

  const addNote = useMutation({
    mutationFn: async ({ memberId, text, idempotencyKey }: { memberId: string; text: string; idempotencyKey: string }) => {
      return TrainerMembersApi.addMemberNote(memberId, { text }, idempotencyKey);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'members', 'detail', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'members'] });
    },
  });

  const updateMember = useMutation({
    mutationFn: async ({ id, data, idempotencyKey }: { id: string; data: Partial<Member>; idempotencyKey: string }) => {
      const res = await TrainerMembersApi.updateMember(id, data, idempotencyKey);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'members'] });
    },
  });

  const assignDiet = useMutation({
    mutationFn: async ({ id, diet }: { id: string; diet: DietPlan | null }) => {
      const res = await TrainerMembersApi.assignDiet(id, diet);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'members'] });
    },
  });

  const assignWorkout = useMutation({
    mutationFn: async ({ id, workout }: { id: string; workout: Workout | null }) => {
      const res = await TrainerMembersApi.assignWorkout(id, workout);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'members'] });
    },
  });

  return {
    updateMember,
    addNote,
    assignDiet,
    assignWorkout
  };
}
