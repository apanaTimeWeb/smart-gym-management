// RESPONSIBILITY: Owns typed HTTP access for Admin plan lifecycle and revenue queries.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { PlansUrlConfig } from '@/app/admin/plans/admin_plans_url_config';
import type { Plan } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import type { PlanRevenueRecord, RevenuePeriod, RevenueSortKey, RevenueSortDirection } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import { planSchema } from '@/app/admin/plans/plans_types/AdminPlansSchemas';
import { planRevenueRecordSchema } from '@/app/admin/plans/plans_types/AdminPlansRevenueSchemas';

export const plansApi = {
  fetchAllPlans: async (params?: { search?: string; tier?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<ApiResponse<Plan[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchAllPlans${suffix}`, { method: 'GET', dataSchema: z.array(planSchema) });
  },
  fetchPlanById: async (id: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanById`, { method: 'GET', body: JSON.stringify({ id }), dataSchema: planSchema }),
  createPlan: async (body: Partial<Plan>, idempotencyKey?: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/createPlan`, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema,
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
}),
  updatePlan: async (id: string, body: Partial<Plan>, idempotencyKey?: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/updatePlan`, { method: 'POST', body: JSON.stringify({ id, ...body }), dataSchema: planSchema,
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
}),
  deletePlan: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${PlansUrlConfig.BACKEND_API.BASE}/deletePlan`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  fetchPlanRevenue: async (period: RevenuePeriod, params?: { search?: string; sortKey?: RevenueSortKey; sortDir?: RevenueSortDirection; page?: number; limit?: number }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
    return apiFetch<ApiResponse<PlanRevenueRecord[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanRevenue?${query.toString()}`, { method: 'GET', dataSchema: z.array(planRevenueRecordSchema) });
  },
};
