// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
// RESPONSIBILITY: Owns Library create/update/delete mutation orchestration and targeted Query cache invalidation.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryApi } from '@/app/manager/library/library_api/ManagerLibraryApi';
import { managerLibraryQueryKeys } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryQueries';
import type { DietPlan, Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerLibraryMutations() {
  const queryClient = useQueryClient();
  const invalidateDiet = () => queryClient.invalidateQueries({ queryKey: managerLibraryQueryKeys.all });
  const invalidateExercise = () => queryClient.invalidateQueries({ queryKey: managerLibraryQueryKeys.all });
  const saveDiet = useMutation({
    mutationFn: (input: { id: string | null; data: Partial<DietPlan> }) => input.id ? libraryApi.updateDietPlan(input.id, input.data) : libraryApi.createDietPlan(input.data),
    onSuccess: invalidateDiet,
  });
  const removeDiet = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => libraryApi.deleteDietPlan(id, idempotencyKey), onSuccess: invalidateDiet });
  const saveExercise = useMutation({
    mutationFn: (input: { id: string | null; data: Partial<Exercise> }) => input.id ? libraryApi.updateExercise(input.id, input.data) : libraryApi.createExercise(input.data),
    onSuccess: invalidateExercise,
  });
  const removeExercise = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => libraryApi.deleteExercise(id, idempotencyKey), onSuccess: invalidateExercise });
  return { saveDiet, removeDiet, saveExercise, removeExercise };
}
