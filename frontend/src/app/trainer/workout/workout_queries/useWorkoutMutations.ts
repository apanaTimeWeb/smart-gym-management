import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutApi } from '@/app/trainer/workout/workout_api/workout_api';
import type { Workout, Exercise, CreateWorkoutPlanDto, CreateExerciseDto } from '@/app/trainer/workout/workout_types/workout.schema';

export function useTrainerWorkoutMutations() {
  const queryClient = useQueryClient();

  const createWorkout = useMutation({
    mutationFn: async (dto: CreateWorkoutPlanDto) => {
      const res = await workoutApi.createWorkout(dto as Partial<Workout>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerWorkouts'] });
    },
  });

  const updateWorkout = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: CreateWorkoutPlanDto }) => {
      const res = await workoutApi.updateWorkout(id, dto as Partial<Workout>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerWorkouts'] });
    },
  });

  const deleteWorkout = useMutation({
    mutationFn: async (id: string) => {
      const res = await workoutApi.removeWorkout(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerWorkouts'] });
    },
  });

  const createExercise = useMutation({
    mutationFn: async (dto: CreateExerciseDto) => {
      const res = await workoutApi.createExercise(dto as Partial<Exercise>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerExercises'] });
    },
  });

  const updateExercise = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: CreateExerciseDto }) => {
      const res = await workoutApi.updateExercise(id, dto as Partial<Exercise>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerExercises'] });
    },
  });

  const deleteExercise = useMutation({
    mutationFn: async (id: string) => {
      const res = await workoutApi.removeExercise(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerExercises'] });
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
