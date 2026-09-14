// RESPONSIBILITY: Modularized API client for the Plans module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminPlansUrlConfig } from '@/app/superadmin/plans/superadmin_plans_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SubscriptionPlan, CreatePlanPayload, UpdatePlanPayload } from '@/app/superadmin/superadmin_types/superadmin_types';

export const plansApi = {
  fetchPlans: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SubscriptionPlan[]>>(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}${q}`);
  },
  fetchPlanById: (id: string) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/${id}`),
  createPlan: (body: CreatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updatePlan: (id: string, body: UpdatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deletePlan: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'DELETE' }),
  archivePlan: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/${id}/archive`, { method: 'PATCH' }),
};
