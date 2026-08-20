// RESPONSIBILITY: Modularized API client for the Plans module. All methods import apiFetch from src/lib/api.ts.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SubscriptionPlan, CreatePlanPayload, UpdatePlanPayload } from '@/app/superadmin/plans/plans_types/plans_types';

export const plansApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SubscriptionPlan[]>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}${q}`);
  },
  getOne: (id: string) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`),
  create: (body: CreatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: UpdatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'DELETE' }),
};
