import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import { planSchema } from '@/app/manager/plans/plans_types/ManagerPlansSchema';
import { z } from 'zod';

export const plansApi = {
  getAll: async (): Promise<ApiResponse<Plan[]>> => {
    return apiFetch(ManagerPlansUrlConfig.BACKEND_API.BASE, { dataSchema: z.array(planSchema) });
  },
  getOne: async (id: string): Promise<ApiResponse<Plan>> => {
    return apiFetch(`${ManagerPlansUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: planSchema });
  },
  create: async (body: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    return apiFetch(ManagerPlansUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema });
  },
  update: async (id: string, body: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    return apiFetch(`${ManagerPlansUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: planSchema });
  },
  remove: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerPlansUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE' });
  },
};
