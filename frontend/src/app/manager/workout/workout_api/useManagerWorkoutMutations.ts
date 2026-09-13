import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutApi } from '@/app/manager/workout/workout_api/ManagerWorkoutApi';
import { libraryApi } from '@/app/manager/library/library_api/ManagerLibraryApi';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';

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
      queryClient.invalidateQueries({ queryKey: ['manager_workout_plans'] });
    },
  });
}

export function useDeleteWorkoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await workoutApi.removeWorkout(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager_workout_plans'] });
    },
  });
}

export function useSaveExerciseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Exercise>) => {
      if (data.id) {
        return await libraryApi.updateExercise(data.id, data);
      }
      return await libraryApi.createExercise(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager_exercises'] });
    },
  });
}

export function useDeleteExerciseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await libraryApi.removeExercise(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager_exercises'] });
    },
  });
}
