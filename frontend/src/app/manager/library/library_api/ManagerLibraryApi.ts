import { apiFetch, type ApiResponse } from '@/lib/api';
import { ManagerLibraryUrlConfig } from '@/app/manager/library/library_url_config';
import type { DietPlan, Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import { dietPlanSchema, exerciseSchema } from '@/app/manager/library/library_types/ManagerLibrarySchema';
import { z } from 'zod';

export const libraryApi = {
  fetchExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: Exercise[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises${query ? `?${query}` : ''}`, { dataSchema: z.object({ exercises: z.array(exerciseSchema), total: z.number() }) });
  },
  
  createExercise: async (body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => {
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises`, { method: 'POST', body: JSON.stringify(body), dataSchema: exerciseSchema });
  },
  
  updateExercise: async (id: string, body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => {
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: exerciseSchema });
  },
  
  deleteExercise: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises/${id}`, { method: 'DELETE', dataSchema: z.object({ id: z.string() }) });
  },
  
  fetchDietPlans: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ dietPlans: DietPlan[]; total: number }>(`${ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${q}`, {
      dataSchema: z.object({ dietPlans: z.array(dietPlanSchema), total: z.number() })
    });
  },
  createDietPlan: (body: Partial<DietPlan>) =>
    apiFetch<DietPlan>(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: dietPlanSchema }),
  updateDietPlan: (id: string, body: Partial<DietPlan>) =>
    apiFetch<DietPlan>(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: dietPlanSchema }),
  deleteDietPlan: (id: string) => apiFetch<{ id: string }>(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_DELETE(id), { method: 'DELETE', dataSchema: z.object({ id: z.string() }) }),
};
