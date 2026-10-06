'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerWorkoutApi } from '@/app/frontend_manager/manager_workout/manager_workout_api/ManagerWorkoutApi';
import { ManagerWorkoutQueryKeys } from '@/app/frontend_manager/manager_workout/manager_workout_constants/ManagerWorkoutQueryKeys';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutSnapshotTypes';
import type { Workout } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useSaveWorkoutMutation.
 * @dependencies Uses ManagerIdempotency, ManagerWorkoutApi, ManagerWorkoutSnapshotTypes, ManagerWorkoutTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useSaveWorkoutMutation owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useSaveWorkoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Workout> & { idempotencyKey: string }) => data.id
      ? ManagerWorkoutApi.updateWorkout(data.id, data, data.idempotencyKey)
      : ManagerWorkoutApi.createWorkout(data, data.idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ManagerWorkoutQueryKeys.plans({}) });
    },
  });
}

/**
 * @description Owns the delete-workout mutation for the Manager Workout module and reconciles the workout-plan query after a successful backend response.
 * @dependencies Uses TanStack Query, ManagerWorkoutApi, the module query-key registry, and a confirmation/idempotency key supplied by the caller.
 * @edge-case A retry must reuse the same idempotency key for the same user intent; the hook never generates business keys itself.
 */
export function useDeleteWorkoutMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerWorkoutApi.deleteWorkout(id, idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ManagerWorkoutQueryKeys.plans({}) });
    },
  });

  return { ...mutation, deleteWorkout: mutation.mutateAsync };
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useSaveExerciseMutation coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useSaveExerciseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ExerciseSnapshot> & { idempotencyKey: string }) => data.id
      ? ManagerWorkoutApi.updateExercise(data.id, data, data.idempotencyKey)
      : ManagerWorkoutApi.createExercise(data, data.idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ManagerWorkoutQueryKeys.exercises({}) });
    },
  });
}

/**
 * @description Owns the delete-exercise mutation for the Manager Workout module and reconciles the exercise query after a successful backend response.
 * @dependencies Uses TanStack Query, ManagerWorkoutApi, the module query-key registry, and a confirmation/idempotency key supplied by the caller.
 * @edge-case A retry must reuse the same idempotency key for the same user intent; the hook never generates business keys itself.
 */
export function useDeleteExerciseMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerWorkoutApi.deleteExercise(id, idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ManagerWorkoutQueryKeys.exercises({}) });
    },
  });

  return { ...mutation, deleteExercise: mutation.mutateAsync };
}
