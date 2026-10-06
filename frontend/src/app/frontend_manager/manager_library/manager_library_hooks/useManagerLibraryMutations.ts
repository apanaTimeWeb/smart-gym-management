'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerLibraryApi } from '@/app/frontend_manager/manager_library/manager_library_api/ManagerLibraryApi';
import { ManagerLibraryQueryKeys } from '@/app/frontend_manager/manager_library/manager_library_constants/ManagerLibraryQueryKeys';
import type { DietPlan, Exercise } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryMutations.
 * @dependencies Uses ManagerIdempotency, ManagerLibraryApi, useManagerLibraryQueries, ManagerLibraryTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryMutations owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryMutations() {
  const queryClient = useQueryClient();
  const invalidateDiet = () => queryClient.invalidateQueries({ queryKey: ManagerLibraryQueryKeys.all });
  const invalidateExercise = () => queryClient.invalidateQueries({ queryKey: ManagerLibraryQueryKeys.all });
  const saveDiet = useMutation({
    mutationFn: (input: { id: string | null; data: Partial<DietPlan>; idempotencyKey: string }) => input.id ? ManagerLibraryApi.updateDietPlan(input.id, input.data, input.idempotencyKey) : ManagerLibraryApi.createDietPlan(input.data, input.idempotencyKey),
    onSuccess: invalidateDiet,
  });
  const removeDiet = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerLibraryApi.deleteDietPlan(id, idempotencyKey), onSuccess: invalidateDiet });
  const saveExercise = useMutation({
    mutationFn: (input: { id: string | null; data: Partial<Exercise>; idempotencyKey: string }) => input.id ? ManagerLibraryApi.updateExercise(input.id, input.data, input.idempotencyKey) : ManagerLibraryApi.createExercise(input.data, input.idempotencyKey),
    onSuccess: invalidateExercise,
  });
  const removeExercise = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerLibraryApi.deleteExercise(id, idempotencyKey), onSuccess: invalidateExercise });
  return { saveDiet, removeDiet, saveExercise, removeExercise };
}
