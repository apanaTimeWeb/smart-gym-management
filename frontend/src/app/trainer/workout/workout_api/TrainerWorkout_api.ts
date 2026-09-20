// RESPONSIBILITY: Provides strongly typed request/response handling for the Trainer Workout feature.
// DATA FLOW: Workout URL contract → apiFetch → canonical ApiResponse validation → feature query/mutation.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { WorkoutUrlConfig } from '@/app/trainer/workout/workout_url_config';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';
import { WorkoutSchema, ExerciseSchema } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import type { Workout, Exercise, CreateWorkoutPlanDto, CreateExerciseDto } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';

const WorkoutCollectionSchema = z.object({
  workouts: z.array(WorkoutSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.string().optional(),
});

const ExerciseCollectionSchema = z.object({
  exercises: z.array(ExerciseSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.string().optional(),
});

const fetchCollection = async <T extends z.ZodTypeAny>(url: string, schema: T, params?: Record<string, string>) => {
  const query = params ? new URLSearchParams(params).toString() : '';
  const requestUrl = query ? `${url}?${query}` : url;
  const raw = await apiFetch<ApiResponse<unknown>>(requestUrl);
  return createTrainerApiResponseSchema(schema).parse(raw);
};

export const workoutApi = {
  fetchWorkouts: async (params?: Record<string, string>) => {
    const response = await fetchCollection(WorkoutUrlConfig.BACKEND_API.WORKOUTS, WorkoutCollectionSchema, params);
    return { data: response.data ?? { workouts: [], total: 0 }, message: response.message };
  },
  createWorkout: async (body: CreateWorkoutPlanDto, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(WorkoutUrlConfig.BACKEND_API.WORKOUTS, {
      method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = createTrainerApiResponseSchema(WorkoutSchema).parse(raw);
    return { data: WorkoutSchema.parse(response.data), message: response.message };
  },
  updateWorkout: async (id: string, body: Partial<CreateWorkoutPlanDto>, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(WorkoutUrlConfig.BACKEND_API.WORKOUT(id), {
      method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = createTrainerApiResponseSchema(WorkoutSchema).parse(raw);
    return { data: WorkoutSchema.parse(response.data), message: response.message };
  },
  deleteWorkout: async (id: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(WorkoutUrlConfig.BACKEND_API.WORKOUT(id), {
      method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = createTrainerApiResponseSchema(z.null()).parse(raw);
    return { data: { id }, message: response.message };
  },
  fetchExercises: async (params?: Record<string, string>) => {
    const response = await fetchCollection(WorkoutUrlConfig.BACKEND_API.EXERCISES, ExerciseCollectionSchema, params);
    return { data: response.data ?? { exercises: [], total: 0 }, message: response.message };
  },
  createExercise: async (body: CreateExerciseDto, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(WorkoutUrlConfig.BACKEND_API.EXERCISES, {
      method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = createTrainerApiResponseSchema(ExerciseSchema).parse(raw);
    return { data: ExerciseSchema.parse(response.data), message: response.message };
  },
  updateExercise: async (id: string, body: Partial<CreateExerciseDto>, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(WorkoutUrlConfig.BACKEND_API.EXERCISE(id), {
      method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = createTrainerApiResponseSchema(ExerciseSchema).parse(raw);
    return { data: ExerciseSchema.parse(response.data), message: response.message };
  },
  deleteExercise: async (id: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(WorkoutUrlConfig.BACKEND_API.EXERCISE(id), {
      method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = createTrainerApiResponseSchema(z.null()).parse(raw);
    return { data: { id }, message: response.message };
  },
};
