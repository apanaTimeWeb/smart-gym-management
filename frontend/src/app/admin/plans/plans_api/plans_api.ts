// RESPONSIBILITY: Provides strongly-typed network calls for the plans module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { PlansUrlConfig } from '@/app/admin/plans/plans_url_config';
import type { Plan } from '@/app/admin/plans/plans_types/plans_types';
import type { PlanRevenueRecord, RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import { z } from "zod";
export const plansApi = {
  fetchAllPlans: async () => {
            return apiFetch(`${PlansUrlConfig.BACKEND_API.BASE}/fetchAllPlans`, { method: 'GET', dataSchema: z.any() });
        },
  fetchPlanById: async (id: string) => {
            return apiFetch(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanById`, { method: 'GET', dataSchema: z.any() });
        },
  createPlan: async (body: Partial<Plan>) => {
          return apiFetch(`${PlansUrlConfig.BACKEND_API.BASE}/createPlan`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() });
      },
  updatePlan: async (id: string, body: Partial<Plan>) => {
          return apiFetch(`${PlansUrlConfig.BACKEND_API.BASE}/updatePlan`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
  deletePlan: async (id: string) => {
          return apiFetch(`${PlansUrlConfig.BACKEND_API.BASE}/deletePlan`, { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.any() });
      },
  fetchPlanRevenue: async (period: RevenuePeriod) => {
          return apiFetch(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanRevenue`, { method: 'GET', dataSchema: z.any() });
      },
};
