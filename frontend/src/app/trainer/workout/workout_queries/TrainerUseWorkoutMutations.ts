import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutApi } from '@/app/trainer/workout/workout_api/TrainerWorkout_api';
import type { Workout, Exercise, CreateWorkoutPlanDto, CreateExerciseDto } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';

export function useTrainerWorkoutMutations() {
  const queryClient = useQueryClient();

  const createWorkout = useMutation({
    mutationFn: async (dto: CreateWorkoutPlanDto) => {
      const res = await workoutApi.createWorkout(dto as Partial<Workout>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'plans'] });
    },
  });

  const updateWorkout = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: CreateWorkoutPlanDto }) => {
      const res = await workoutApi.updateWorkout(id, dto as Partial<Workout>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'plans'] });
    },
  });

  const deleteWorkout = useMutation({
    mutationFn: async (id: string) => {
      const res = await workoutApi.deleteWorkout(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'plans'] });
    },
  });

  const createExercise = useMutation({
    mutationFn: async (dto: CreateExerciseDto) => {
      const res = await workoutApi.createExercise(dto as Partial<Exercise>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'exercises'] });
    },
  });

  const updateExercise = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: CreateExerciseDto }) => {
      const res = await workoutApi.updateExercise(id, dto as Partial<Exercise>);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'workout', 'exercises'] });
    },
  });

  const deleteExercise = useMutation({
    mutationFn: async (id: string) => {
      const res = await workoutApi.deleteExercise(id);
      return res.data;
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
