// RESPONSIBILITY: Owns the Diet Library assignment query and non-duplicable assignment mutation.
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { libraryApi } from '@/app/trainer/library/library_api/TrainerLibrary_api';

/** Owns useTrainerLibraryAssignment behavior for this Trainer module. */
export function useTrainerLibraryAssignment() {
  const queryClient = useQueryClient();
  const membersQuery = useQuery({ queryKey: ['trainer', 'library', 'assigned-members'], queryFn: libraryApi.fetchAssignedMembers });
  const assignDietPlan = useMutation({
    mutationFn: ({ memberId, dietPlanId, idempotencyKey }: { memberId: string; dietPlanId: string; idempotencyKey: string }) => libraryApi.assignDietPlan(memberId, dietPlanId, idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['trainer', 'library', 'assigned-members'] });
      void queryClient.invalidateQueries({ queryKey: ['trainer', 'library', 'diet-plans'] });
    },
  });
  return { membersQuery, assignDietPlan };
}
