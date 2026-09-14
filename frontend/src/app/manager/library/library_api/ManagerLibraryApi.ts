import { ManagerLibraryUrlConfig } from '@/app/manager/library/library_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { LibraryUrlConfig } from '@/app/manager/library/ManagerLibraryUrlConfig';
import type { DietPlan, Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import { dietPlanSchema, exerciseSchema } from '@/app/manager/library/library_types/ManagerLibrarySchema';
import { z } from 'zod';

export const libraryApi = {
  getExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: Exercise[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises${query ? `?${query}` : ''}`, { dataSchema: z.object({ exercises: z.array(exerciseSchema), total: z.number() }) });
  },
  
  createExercise: async (body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => {
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises`, { method: 'POST', body: JSON.stringify(body), dataSchema: exerciseSchema });
  },
  
  updateExercise: async (id: string, body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => {
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: exerciseSchema });
  },
  
  removeExercise: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerLibraryUrlConfig.BACKEND_API.BASE}/exercises/${id}`, { method: 'DELETE' });
  },
  
  getDietPlans: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ dietPlans: DietPlan[]; total: number }>>(`${LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${q}`, {
      dataSchema: z.object({ dietPlans: z.array(dietPlanSchema), total: z.number() })
    });
  },
  createDietPlan: (body: Partial<DietPlan>) =>
    apiFetch<ApiResponse<DietPlan>>(LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: dietPlanSchema }),
  updateDietPlan: (id: string, body: Partial<DietPlan>) =>
    apiFetch<ApiResponse<DietPlan>>(LibraryUrlConfig.BACKEND_API.DIET_PLAN_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: dietPlanSchema }),
  removeDietPlan: (id: string) => apiFetch<ApiResponse<{ id: string }>>(LibraryUrlConfig.BACKEND_API.DIET_PLAN_DELETE(id), { method: 'DELETE' }),
};
