// RESPONSIBILITY: Provides strongly-typed network calls for the library module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { LibraryUrlConfig } from '@/app/manager/library/ManagerLibraryUrlConfig';
import type { DietPlan, Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import { MOCK_MANAGER_EXERCISES } from '@/app/manager/library/library_api/ManagerLibraryMockData';

let MOCK_EXERCISES_DB = [...MOCK_MANAGER_EXERCISES];
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const libraryApi = {
  getExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: Exercise[]; total: number }>> => {
    await delay(600);
    let results = [...MOCK_EXERCISES_DB];
    
    if (params?.search) {
      const q = params.search.toLowerCase();
      results = results.filter(e => e.name.toLowerCase().includes(q) || (e.category && e.category.toLowerCase().includes(q)));
    }
    
    const page = parseInt(params?.page || '1', 10);
    const limit = parseInt(params?.limit || '12', 10);
    const total = results.length;
    
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);
    
    return { success: true, data: { exercises: paginated, total }, message: 'Exercises fetched' };
  },
  
  createExercise: async (body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => {
    await delay(600);
    const newExercise: Exercise = {
      ...body,
      id: `ex-${Date.now()}`,
      name: body.name || 'New Exercise',
      muscleGroup: body.muscleGroup || [],
      category: body.category || '',
      difficulty: body.difficulty || 'ALL',
      isActive: body.isActive !== undefined ? body.isActive : true
    };
    MOCK_EXERCISES_DB = [newExercise, ...MOCK_EXERCISES_DB];
    return { success: true, data: newExercise, message: 'Exercise created successfully' };
  },
  
  updateExercise: async (id: string, body: Partial<Exercise>): Promise<ApiResponse<Exercise>> => {
    await delay(600);
    const index = MOCK_EXERCISES_DB.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Exercise not found');
    MOCK_EXERCISES_DB[index] = { ...MOCK_EXERCISES_DB[index], ...body } as Exercise;
    return { success: true, data: MOCK_EXERCISES_DB[index], message: 'Exercise updated successfully' };
  },
  
  removeExercise: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    await delay(600);
    MOCK_EXERCISES_DB = MOCK_EXERCISES_DB.filter(e => e.id !== id);
    return { success: true, data: { id }, message: 'Exercise deleted successfully' };
  },
  
  getDietPlans: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ dietPlans: DietPlan[]; total: number }>>(`${LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${q}`);
  },
  createDietPlan: (body: Partial<DietPlan>) =>
    apiFetch<ApiResponse<DietPlan>>(LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateDietPlan: (id: string, body: Partial<DietPlan>) =>
    apiFetch<ApiResponse<DietPlan>>(LibraryUrlConfig.BACKEND_API.DIET_PLAN_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeDietPlan: (id: string) => apiFetch<ApiResponse<{ id: string }>>(LibraryUrlConfig.BACKEND_API.DIET_PLAN_DELETE(id), { method: 'DELETE' }),
};
