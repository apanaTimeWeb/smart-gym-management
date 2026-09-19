// RESPONSIBILITY: Defines the Manager Library HTTP contract; request/response validation stays at this boundary.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ManagerLibraryUrlConfig } from '@/app/manager/library/library_url_config';
import type { DietPlan, Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import { dietPlanSchema, exerciseSchema } from '@/app/manager/library/library_schemas/ManagerLibrarySchema';

export type ManagerLibraryListParams = Record<string, string>;

const withIdempotencyHeader = (idempotencyKey?: string): HeadersInit | undefined =>
  idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined;

export const libraryApi = {
  fetchExercises: async (params?: ManagerLibraryListParams): Promise<ApiResponse<{ exercises: Exercise[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.EXERCISES_BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ exercises: z.array(exerciseSchema), total: z.number() }),
    });
  },
  createExercise: async (body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.EXERCISES_BASE,
    { method: 'POST', body: JSON.stringify(body), dataSchema: exerciseSchema },
  ),
  updateExercise: async (id: string, body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.EXERCISE_UPDATE(id),
    { method: 'PATCH', body: JSON.stringify(body), dataSchema: exerciseSchema },
  ),
  deleteExercise: async (id: string, idempotencyKey?: string): Promise<ApiResponse<{ id: string }>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.EXERCISE_DELETE(id),
    { method: 'DELETE', headers: withIdempotencyHeader(idempotencyKey), dataSchema: z.object({ id: z.string() }) },
  ),
  fetchDietPlans: async (params?: ManagerLibraryListParams): Promise<ApiResponse<{ dietPlans: DietPlan[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ dietPlans: z.array(dietPlanSchema), total: z.number() }),
    });
  },
  createDietPlan: async (body: Partial<DietPlan>): Promise<ApiResponse<DietPlan>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE,
    { method: 'POST', body: JSON.stringify(body), dataSchema: dietPlanSchema },
  ),
  updateDietPlan: async (id: string, body: Partial<DietPlan>): Promise<ApiResponse<DietPlan>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_UPDATE(id),
    { method: 'PATCH', body: JSON.stringify(body), dataSchema: dietPlanSchema },
  ),
  deleteDietPlan: async (id: string, idempotencyKey?: string): Promise<ApiResponse<{ id: string }>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_DELETE(id),
    { method: 'DELETE', headers: withIdempotencyHeader(idempotencyKey), dataSchema: z.object({ id: z.string() }) },
  ),
};
