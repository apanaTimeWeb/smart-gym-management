import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import { planSchema } from '@/app/manager/plans/plans_types/ManagerPlansSchema';
import { z } from 'zod';

export const plansApi = {
  getAll: async (): Promise<ApiResponse<Plan[]>> => {
    return apiFetch(`/manager/plans`, { dataSchema: z.array(planSchema) });
  },
  getOne: async (id: string): Promise<ApiResponse<Plan>> => {
    return apiFetch(`/manager/plans/${id}`, { dataSchema: planSchema });
  },
  create: async (body: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    return apiFetch(`/manager/plans`, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema });
  },
  update: async (id: string, body: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    return apiFetch(`/manager/plans/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: planSchema });
  },
  remove: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`/manager/plans/${id}`, { method: 'DELETE' });
  },
};
