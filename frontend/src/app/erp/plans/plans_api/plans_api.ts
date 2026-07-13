// RESPONSIBILITY: Provides strongly-typed network calls for the plans module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { PlansUrlConfig } from '@/app/erp/plans/plans_url_config';
import type { Plan } from '@/app/erp/plans/plans_types/plans_types';

export const plansApi = {
  getAll: () => apiFetch<ApiResponse<Plan[]>>(PlansUrlConfig.BACKEND_API.BASE),
  getOne: (id: number) => apiFetch<ApiResponse<Plan>>(PlansUrlConfig.BACKEND_API.GET_ONE(id)),
  create: (body: Partial<Plan>) =>
    apiFetch<ApiResponse<Plan>>(PlansUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: number, body: Partial<Plan>) =>
    apiFetch<ApiResponse<Plan>>(PlansUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: number) => apiFetch<ApiResponse<{ id: number }>>(PlansUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE' }),
};
