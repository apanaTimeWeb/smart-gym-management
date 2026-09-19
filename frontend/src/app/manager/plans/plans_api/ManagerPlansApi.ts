import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import { planSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansSchema';
import { z } from 'zod';

export const plansApi = {
  fetchPlans: async (params?: Record<string, string>): Promise<ApiResponse<{ plans: Plan[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerPlansUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ plans: z.array(planSchema), total: z.number() }) });
  },
  fetchPlanById: async (id: string): Promise<ApiResponse<Plan>> => {
    return apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { dataSchema: planSchema });
  },
  createPlan: async (body: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    return apiFetch(ManagerPlansUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema });
  },
  updatePlan: async (id: string, body: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    return apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: planSchema });
  },
  deletePlan: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  } };
