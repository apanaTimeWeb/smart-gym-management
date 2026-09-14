// RESPONSIBILITY: Provides strongly-typed network calls for the plans module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { PlansUrlConfig } from '@/app/admin/plans/plans_url_config';
import type { Plan } from '@/app/admin/plans/plans_types/plans_types';
import type { PlanRevenueRecord, RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import { z } from "zod";
export const plansApi = {
  fetchAllPlans: async () => {
            return apiFetch('/api/admin/plans/fetchAllPlans', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchPlanById: async (id: string) => {
            return apiFetch('/api/admin/plans/fetchPlanById', { method: 'GET', dataSchema: z.unknown() });
        },
  createPlan: async (body: Partial<Plan>) => {
          return apiFetch('/api/admin/plans/createPlan', { method: 'POST', body: JSON.stringify(body), dataSchema: z.unknown() });
      },
  updatePlan: async (id: string, body: Partial<Plan>) => {
          return apiFetch('/api/admin/plans/updatePlan', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  deletePlan: async (id: string) => {
          return apiFetch('/api/admin/plans/deletePlan', { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  fetchPlanRevenue: async (period: RevenuePeriod) => {
          return apiFetch('/api/admin/plans/fetchPlanRevenue', { method: 'GET', dataSchema: z.unknown() });
      },
};
