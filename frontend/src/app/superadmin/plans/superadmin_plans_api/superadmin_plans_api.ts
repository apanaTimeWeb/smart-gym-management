// RESPONSIBILITY: Modularized API client for the Plans module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { PlansUrlConfig } from '@/app/superadmin/plans/plans_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SubscriptionPlan, CreatePlanPayload, UpdatePlanPayload } from '@/app/superadmin/superadmin_types/superadmin_types';
import { z } from "zod";

export const plansApi = {
  fetchPlans: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SubscriptionPlan[]>>(`${PlansUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.unknown() });
  },
  fetchPlanById: (id: string) => apiFetch<ApiResponse<SubscriptionPlan>>(`${PlansUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: z.unknown() }),
  createPlan: (body: CreatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(PlansUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body),
      dataSchema: z.unknown()
}),
  updatePlan: (id: string, body: UpdatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(`${PlansUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
      dataSchema: z.unknown()
}),
  deletePlan: (id: string) => apiFetch<ApiResponse<void>>(`${PlansUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE',
      dataSchema: z.unknown()
}),
  archivePlan: (id: string) => apiFetch<ApiResponse<void>>(`${PlansUrlConfig.BACKEND_API.BASE}/${id}/archive`, { method: 'PATCH',
      dataSchema: z.unknown()
}),
};
