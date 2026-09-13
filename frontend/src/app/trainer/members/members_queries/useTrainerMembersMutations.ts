// RESPONSIBILITY: Custom hook for Trainer member mutations using TanStack Query.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrainerMembersApi } from '../members_api/TrainerMembersApi';
import type { Member, DietPlan, Workout } from '../members_types/members_types';

export function useTrainerMembersMutations() {
  const queryClient = useQueryClient();

  const updateMember = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Member> }) => {
      const res = await TrainerMembersApi.updateMember(id, data);
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
    assignDiet,
    assignWorkout
  };
}
