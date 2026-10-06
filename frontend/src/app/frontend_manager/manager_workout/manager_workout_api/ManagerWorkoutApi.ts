import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { workoutSchema, exerciseSnapshotSchema } from '@/app/frontend_manager/manager_workout/manager_workout_schemas/ManagerWorkoutSchema';
import { ManagerWorkoutUrlConfig } from '@/app/frontend_manager/manager_workout/manager_workout_url_config';
import type { ManagerWorkoutAssignment } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutAssignmentTypes';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutSnapshotTypes';
import type { Workout } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerWorkoutApi implementation for the workout module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_workout/manager_workout_schemas/ManagerWorkoutSchema; @/app/frontend_manager/manager_workout/manager_workout_url_config; @/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutAssignmentTypes; @/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutSnapshotTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerWorkoutApi = {
  fetchWorkouts: async (params?: Record<string, string>): Promise<ApiResponse<{ workouts: Workout[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ workouts: z.array(workoutSchema), total: z.number() }) });
  },
  
  createWorkout: async (body: Partial<Workout>, idempotencyKey: string): Promise<ApiResponse<Workout>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: workoutSchema });
  },
  
  updateWorkout: async (id: string, body: Partial<Workout>, idempotencyKey: string): Promise<ApiResponse<Workout>> => {
    return apiFetch(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUT(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: workoutSchema });
  },
  
  deleteWorkout: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUT(id), {
      method: 'DELETE',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: z.object({ id: z.string() })
    });
  },
  
  fetchExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: ExerciseSnapshot[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUT_EXERCISES(query), { dataSchema: z.object({ exercises: z.array(exerciseSnapshotSchema), total: z.number().default(0) }) });
  },
  
  createExercise: async (body: Partial<ExerciseSnapshot>, idempotencyKey: string): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(`${ManagerWorkoutUrlConfig.BACKEND_API.EXERCISES_BASE}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSnapshotSchema });
  },
  
  updateExercise: async (id: string, body: Partial<ExerciseSnapshot>, idempotencyKey: string): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(ManagerWorkoutUrlConfig.BACKEND_API.EXERCISE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSnapshotSchema });
  },
  
  fetchAssignments: async (): Promise<ApiResponse<ManagerWorkoutAssignment[]>> => apiFetch(ManagerWorkoutUrlConfig.BACKEND_API.ASSIGNMENTS, { dataSchema: z.array(z.object({ id: z.string(), memberName: z.string(), planName: z.string(), assignedBy: z.string(), startDate: z.string() })) }),

  deleteExercise: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerWorkoutUrlConfig.BACKEND_API.EXERCISE(id), {
      method: 'DELETE',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: z.object({ id: z.string() })
    });
  } };
