import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { dietPlanSchema, exerciseSchema } from '@/app/frontend_manager/manager_library/manager_library_schemas/ManagerLibrarySchema';
import { ManagerLibraryUrlConfig } from '@/app/frontend_manager/manager_library/manager_library_url_config';
import type { DietPlan, Exercise } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryTypes';
import type { ApiResponse } from '@/lib/api';


export type ManagerLibraryListParams = Record<string, string>;

/**
 * @description Provides the ManagerLibraryApi implementation for the library module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_library/manager_library_schemas/ManagerLibrarySchema; @/app/frontend_manager/manager_library/manager_library_url_config; @/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerLibraryApi = {
  fetchExercises: async (params?: ManagerLibraryListParams): Promise<ApiResponse<{ exercises: Exercise[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.EXERCISES_BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ exercises: z.array(exerciseSchema), total: z.number() }),
    });
  },
  createExercise: async (body: Partial<Exercise>, idempotencyKey: string): Promise<ApiResponse<Exercise>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.EXERCISES_BASE,
    { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSchema },
  ),
  updateExercise: async (id: string, body: Partial<Exercise>, idempotencyKey: string): Promise<ApiResponse<Exercise>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.EXERCISE_UPDATE(id),
    { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSchema },
  ),
  deleteExercise: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.EXERCISE_DELETE(id),
    { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) },
  ),
  fetchDietPlans: async (params?: ManagerLibraryListParams): Promise<ApiResponse<{ dietPlans: DietPlan[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ dietPlans: z.array(dietPlanSchema), total: z.number() }),
    });
  },
  createDietPlan: async (body: Partial<DietPlan>, idempotencyKey: string): Promise<ApiResponse<DietPlan>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE,
    { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: dietPlanSchema },
  ),
  updateDietPlan: async (id: string, body: Partial<DietPlan>, idempotencyKey: string): Promise<ApiResponse<DietPlan>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_UPDATE(id),
    { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: dietPlanSchema },
  ),
  deleteDietPlan: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(
    ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_DELETE(id),
    { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) },
  ),
};
