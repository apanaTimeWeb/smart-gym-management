'use client';
// DATA FLOW: Trainer component confirmation → mutation → feature API → canonical response → Query invalidation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutApi } from '@/app/trainer/workout/workout_api/TrainerWorkout_api';
import type { Workout, Exercise, CreateWorkoutPlanDto, CreateExerciseDto } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';

/** Owns workout create/update/delete mutations and invalidates the affected server-state queries. */
export function useTrainerWorkoutMutations() {
  const queryClient = useQueryClient();

  const createWorkout = useMutation({
    mutationFn: async ({ dto, idempotencyKey }: { dto: CreateWorkoutPlanDto; idempotencyKey: string }) => {
      const res = await workoutApi.createWorkout(dto, idempotencyKey);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'plans'] });
    },
  });

  const updateWorkout = useMutation({
    mutationFn: async ({ id, dto, idempotencyKey }: { id: string; dto: CreateWorkoutPlanDto; idempotencyKey?: string }) => {
      const res = await workoutApi.updateWorkout(id, dto, idempotencyKey!);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'plans'] });
    },
  });

  const deleteWorkout = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => {
      const res = await workoutApi.deleteWorkout(id, idempotencyKey);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'plans'] });
    },
  });

  const createExercise = useMutation({
    mutationFn: async ({ dto, idempotencyKey }: { dto: CreateExerciseDto; idempotencyKey: string }) => {
      const res = await workoutApi.createExercise(dto, idempotencyKey);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'exercises'] });
    },
  });

  const updateExercise = useMutation({
    mutationFn: async ({ id, dto, idempotencyKey }: { id: string; dto: CreateExerciseDto; idempotencyKey?: string }) => {
      const res = await workoutApi.updateExercise(id, dto, idempotencyKey!);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'exercises'] });
    },
  });

  const deleteExercise = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => {
      const res = await workoutApi.deleteExercise(id, idempotencyKey);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'exercises'] });
    },
  });

  return {
    createWorkout,
    updateWorkout,
    deleteWorkout,
    createExercise,
    updateExercise,
    deleteExercise
  };
}
