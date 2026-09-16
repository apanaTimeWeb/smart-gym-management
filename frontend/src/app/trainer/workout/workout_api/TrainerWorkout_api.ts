import { z } from 'zod';
import type { Workout, Exercise } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import { WorkoutSchema, ExerciseSchema } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { WorkoutUrlConfig } from '@/app/trainer/Trainer_url_config';

export const workoutApi = {
  getWorkouts: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await apiFetch<ApiResponse<{ workouts: unknown[]; total: number }>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}${q}`);
    return { data: { workouts: z.array(WorkoutSchema).parse(res.data?.workouts || []), total: res.data?.total || 0 } };
  },
  
  createWorkout: async (body: Partial<Workout>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return { data: WorkoutSchema.parse(res.data) };
  },
  
  updateWorkout: async (id: string, body: Partial<Workout>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    return { data: WorkoutSchema.parse(res.data) };
  },
  
  removeWorkout: async (id: string) => {
    await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS}/${id}`, {
      method: 'DELETE',
    });
    return { data: { id } };
  },
  
  getExercises: async (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await apiFetch<ApiResponse<{ exercises: unknown[]; total: number }>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}${q}`);
    return { data: { exercises: z.array(ExerciseSchema).parse(res.data?.exercises || []), total: res.data?.total || 0 } };
  },
  
  createExercise: async (body: Partial<Exercise>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return { data: ExerciseSchema.parse(res.data) };
  },
  
  updateExercise: async (id: string, body: Partial<Exercise>) => {
    const res = await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    return { data: ExerciseSchema.parse(res.data) };
  },
  
  removeExercise: async (id: string) => {
    await apiFetch<ApiResponse<unknown>>(`${WorkoutUrlConfig.BACKEND_API.EXERCISES}/${id}`, {
      method: 'DELETE',
    });
    return { data: { id } };
  },
};
