'use client';
// RESPONSIBILITY: Owns the assignment relationship query and mutation for the Diet Library.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { libraryApi } from '@/app/trainer/library/library_api/TrainerLibrary_api';

export function useTrainerLibraryAssignment() {
  const queryClient = useQueryClient();
  const membersQuery = useQuery({ queryKey: ['trainer', 'library', 'assigned-members'], queryFn: libraryApi.fetchAssignedMembers });
  const assignDietPlan = useMutation({
    mutationFn: ({ memberId, dietPlanId }: { memberId: string; dietPlanId: string }) => libraryApi.assignDietPlan(memberId, dietPlanId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'library', 'assigned-members'] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'library', 'diet-plans'] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'members'] });
    },
  });
  return { membersQuery, assignDietPlan };
}
