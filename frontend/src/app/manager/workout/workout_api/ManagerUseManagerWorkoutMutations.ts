// DATA FLOW: Manager module state/API data → useManagerWorkoutMutations → owning Manager UI components.
/** Manages UseWorkoutMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutApi } from '@/app/manager/workout/workout_api/ManagerWorkoutApi';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { ExerciseSnapshot } from '@/app/manager/workout/workout_types/ManagerWorkoutSnapshotTypes';

export function useSaveWorkoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Workout>) => {
      if (data.id) {
        return await workoutApi.updateWorkout(data.id, data);
      }
      return await workoutApi.createWorkout(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'plans'] });
    },
  });
}

export function useDeleteWorkoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await workoutApi.deleteWorkout(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'plans'] });
    },
  });
}

export function useSaveExerciseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ExerciseSnapshot>) => {
      if (data.id) {
        return await workoutApi.updateExercise(data.id, data);
      }
      return await workoutApi.createExercise(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'exercises'] });
    },
  });
}

export function useDeleteExerciseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await workoutApi.deleteExercise(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'workout', 'exercises'] });
    },
  });
}
