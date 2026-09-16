// RESPONSIBILITY: Owns typed HTTP access for Admin plan lifecycle and revenue queries.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { PlansUrlConfig } from '@/app/admin/plans/admin_plans_url_config';
import type { Plan } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import type { PlanRevenueRecord, RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import { planSchema } from '@/app/admin/plans/plans_types/AdminPlansSchemas';
import { planRevenueRecordSchema } from '@/app/admin/plans/plans_types/AdminPlansRevenueSchemas';

export const plansApi = {
  fetchAllPlans: async () => apiFetch<ApiResponse<Plan[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchAllPlans`, { method: 'GET', dataSchema: z.array(planSchema) }),
  fetchPlanById: async (id: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanById`, { method: 'GET', body: JSON.stringify({ id }), dataSchema: planSchema }),
  createPlan: async (body: Partial<Plan>) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/createPlan`, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema }),
  updatePlan: async (id: string, body: Partial<Plan>) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/updatePlan`, { method: 'POST', body: JSON.stringify({ id, ...body }), dataSchema: planSchema }),
  deletePlan: async (id: string) => apiFetch<ApiResponse<null>>(`${PlansUrlConfig.BACKEND_API.BASE}/deletePlan`, { method: 'DELETE', body: JSON.stringify({ id }), dataSchema: z.null() }),
  fetchPlanRevenue: async (period: RevenuePeriod) => apiFetch<ApiResponse<PlanRevenueRecord[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanRevenue?period=${encodeURIComponent(period)}`, { method: 'GET', dataSchema: z.array(planRevenueRecordSchema) }),
};
