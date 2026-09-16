import { ManagerWorkoutUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { ExerciseSnapshot } from '@/app/manager/workout/workout_types/ManagerWorkoutSnapshotTypes';
import { workoutSchema, exerciseSnapshotSchema } from '@/app/manager/workout/workout_types/ManagerWorkoutSchema';
import { z } from 'zod';
import type { ManagerWorkoutAssignment } from '@/app/manager/workout/workout_types/ManagerWorkoutAssignmentTypes';

export const workoutApi = {
  getWorkouts: async (params?: Record<string, string>): Promise<ApiResponse<{ workouts: Workout[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ workouts: z.array(workoutSchema), total: z.number() }) });
  },
  
  createWorkout: async (body: Partial<Workout>): Promise<ApiResponse<Workout>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}`, { method: 'POST', body: JSON.stringify(body), dataSchema: workoutSchema });
  },
  
  updateWorkout: async (id: string, body: Partial<Workout>): Promise<ApiResponse<Workout>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: workoutSchema });
  },
  
  removeWorkout: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}/${id}`, {
      method: 'DELETE',
      dataSchema: z.object({ id: z.string() })
    });
  },
  
  getExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: ExerciseSnapshot[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}/exercises${query ? `?${query}` : ''}`, { dataSchema: z.object({ exercises: z.array(exerciseSnapshotSchema), total: z.number().default(0) }) });
  },
  
  createExercise: async (body: Partial<ExerciseSnapshot>): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.EXERCISES_BASE}`, { method: 'POST', body: JSON.stringify(body), dataSchema: exerciseSnapshotSchema });
  },
  
  updateExercise: async (id: string, body: Partial<ExerciseSnapshot>): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.EXERCISES_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: exerciseSnapshotSchema });
  },
  
  getAssignments: async (): Promise<ApiResponse<ManagerWorkoutAssignment[]>> => apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.BASE}/assignments`, { dataSchema: z.array(z.object({ id: z.string(), memberName: z.string(), planName: z.string(), assignedBy: z.string(), startDate: z.string() })) }),

  removeExercise: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}/exercises/${id}`, {
      method: 'DELETE',
      dataSchema: z.object({ id: z.string() })
    });
  },
};
