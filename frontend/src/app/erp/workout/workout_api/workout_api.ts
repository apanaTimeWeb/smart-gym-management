// RESPONSIBILITY: Provides strongly-typed network calls for the workout module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { WorkoutUrlConfig } from '@/app/erp/workout/workout_url_config';
import type { Workout } from '@/app/erp/workout/workout_types/workout_types';

export const workoutApi = {
  getWorkouts: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ workouts: Workout[], total: number }>>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}${q}`);
  },
  createWorkout: (body: Partial<Workout>) =>
    apiFetch<ApiResponse<Workout>>(WorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateWorkout: (id: number, body: Partial<Workout>) =>
    apiFetch<ApiResponse<Workout>>(WorkoutUrlConfig.BACKEND_API.WORKOUT_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeWorkout: (id: number) => apiFetch<ApiResponse<{ id: number }>>(WorkoutUrlConfig.BACKEND_API.WORKOUT_DELETE(id), { method: 'DELETE' }),
};
