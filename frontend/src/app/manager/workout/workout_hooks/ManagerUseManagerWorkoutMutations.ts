// DATA FLOW: Workout UI → TanStack mutation → Workout API → query cache invalidation → Workout UI.
// RESPONSIBILITY: Owns Workout create/update/delete mutations and their cache invalidation/confirmation boundaries.
'use client';
/** Coordinates the Manager / feature. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutApi } from '@/app/manager/workout/workout_api/ManagerWorkoutApi';
import type { ExerciseSnapshot } from '@/app/manager/workout/workout_types/ManagerWorkoutSnapshotTypes';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useSaveWorkoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Workout>) => data.id
      ? workoutApi.updateWorkout(data.id, data)
      : workoutApi.createWorkout(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'plans'] });
    },
  });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useDeleteWorkoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => workoutApi.deleteWorkout(id, idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'plans'] });
    },
  });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useSaveExerciseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ExerciseSnapshot>) => data.id
      ? workoutApi.updateExercise(data.id, data)
      : workoutApi.createExercise(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'exercises'] });
    },
  });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useDeleteExerciseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => workoutApi.deleteExercise(id, idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'exercises'] });
    },
  });
}
