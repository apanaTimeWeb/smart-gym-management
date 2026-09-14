import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { ExerciseSnapshot } from '@/app/manager/workout/workout_types/ManagerWorkoutSnapshotTypes';
import { workoutSchema, exerciseSnapshotSchema } from '@/app/manager/workout/workout_types/ManagerWorkoutSchema';
import { z } from 'zod';

export const workoutApi = {
  getWorkouts: async (params?: Record<string, string>): Promise<ApiResponse<{ workouts: Workout[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/workouts${query ? `?${query}` : ''}`, { dataSchema: z.object({ workouts: z.array(workoutSchema), total: z.number() }) });
  },
  
  createWorkout: async (body: Partial<Workout>): Promise<ApiResponse<Workout>> => {
    return apiFetch(`/manager/workout/plans`, { method: 'POST', body: JSON.stringify(body), dataSchema: workoutSchema });
  },
  
  updateWorkout: async (id: string, body: Partial<Workout>): Promise<ApiResponse<Workout>> => {
    return apiFetch(`/manager/workout/plans/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: workoutSchema });
  },
  
  removeWorkout: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`/manager/workouts/${id}`, {
      method: 'DELETE'
    });
  },
  
  getExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: ExerciseSnapshot[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/workouts/exercises${query ? `?${query}` : ''}`, { dataSchema: z.object({ exercises: z.array(exerciseSnapshotSchema), total: z.number().default(0) }) });
  },
  
  createExercise: async (body: Partial<ExerciseSnapshot>): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(`/manager/workout/exercises`, { method: 'POST', body: JSON.stringify(body), dataSchema: exerciseSnapshotSchema });
  },
  
  updateExercise: async (id: string, body: Partial<ExerciseSnapshot>): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(`/manager/workout/exercises/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: exerciseSnapshotSchema });
  },
  
  removeExercise: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`/manager/workouts/exercises/${id}`, {
      method: 'DELETE'
    });
  },
};
