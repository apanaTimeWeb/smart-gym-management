import { z } from 'zod';
import type { Workout, Exercise } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import { WorkoutSchema, ExerciseSchema } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { WorkoutUrlConfig } from '@/app/trainer/workout/workout_url_config';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export const workoutApi = {
  fetchWorkouts: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}${q}`);
    const response = createTrainerApiResponseSchema(z.object({ workouts: z.array(WorkoutSchema), total: z.number().int().nonnegative() })).parse(res);
    return { data: response.data ?? { workouts: [], total: 0 }, message: response.message };
  },
  
  createWorkout: async (body: Partial<Workout>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const response = createTrainerApiResponseSchema(WorkoutSchema).parse(res);
    return { data: WorkoutSchema.parse(response.data), message: response.message };
  },
  
  updateWorkout: async (id: string, body: Partial<Workout>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const response = createTrainerApiResponseSchema(WorkoutSchema).parse(res);
    return { data: WorkoutSchema.parse(response.data), message: response.message };
  },
  
  deleteWorkout: async (id: string) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}/${id}`, {
      method: 'DELETE',
    });
    const response = createTrainerApiResponseSchema(z.null()).parse(res);
    return { data: { id }, message: response.message };
  },
  
  fetchExercises: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}${q}`);
    const response = createTrainerApiResponseSchema(z.object({ exercises: z.array(ExerciseSchema), total: z.number().int().nonnegative() })).parse(res);
    return { data: response.data ?? { exercises: [], total: 0 }, message: response.message };
  },
  
  createExercise: async (body: Partial<Exercise>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const response = createTrainerApiResponseSchema(ExerciseSchema).parse(res);
    return { data: ExerciseSchema.parse(response.data), message: response.message };
  },
  
  updateExercise: async (id: string, body: Partial<Exercise>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const response = createTrainerApiResponseSchema(ExerciseSchema).parse(res);
    return { data: ExerciseSchema.parse(response.data), message: response.message };
  },
  
  deleteExercise: async (id: string) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}/${id}`, {
      method: 'DELETE',
    });
    const response = createTrainerApiResponseSchema(z.null()).parse(res);
    return { data: { id }, message: response.message };
  },
};
