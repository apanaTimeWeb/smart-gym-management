// RESPONSIBILITY: Owns typed HTTP access for Admin plan lifecycle and revenue queries.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_PLANS_API } from '@/app/frontend_admin/admin_plans/admin_plans_url_config';
import type { Plan } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';
import type { PlanRevenueRecord, RevenuePeriod, RevenueSortKey, RevenueSortDirection } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';
import { planSchema } from '@/app/frontend_admin/admin_plans/admin_plans_schemas/AdminPlansSchemas';
import { planRevenueRecordSchema } from '@/app/frontend_admin/admin_plans/admin_plans_schemas/AdminPlansSchemas';

export const AdminPlansApi = {
  fetchAllPlans: async (params?: { search?: string; tier?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<ApiResponse<Plan[]>>(`${ADMIN_PLANS_API.getAll}${suffix}`, { method: 'GET', dataSchema: z.array(planSchema) });
  },
  fetchPlanById: async (id: string) => apiFetch<ApiResponse<Plan>>(ADMIN_PLANS_API.getOneContract, { method: 'GET', body: JSON.stringify({ id }), dataSchema: planSchema }),
  createPlan: async (body: Partial<Plan>, idempotencyKey: string) => apiFetch<ApiResponse<Plan>>(ADMIN_PLANS_API.create, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema,
      headers: { 'Idempotency-Key': idempotencyKey }
}),
  updatePlan: async (id: string, body: Partial<Plan>, idempotencyKey: string) => apiFetch<ApiResponse<Plan>>(ADMIN_PLANS_API.updateContract, { method: 'POST', body: JSON.stringify({ id, ...body }), dataSchema: planSchema,
      headers: { 'Idempotency-Key': idempotencyKey }
}),
  deletePlan: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_PLANS_API.deleteContract, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  fetchPlanRevenue: async (period: RevenuePeriod, params?: { search?: string; sortKey?: RevenueSortKey; sortDir?: RevenueSortDirection; page?: number; limit?: number }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
    return apiFetch<ApiResponse<PlanRevenueRecord[]>>(`${ADMIN_PLANS_API.revenue}?${query.toString()}`, { method: 'GET', dataSchema: z.array(planRevenueRecordSchema) });
  },
};
