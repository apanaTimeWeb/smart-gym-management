// RESPONSIBILITY: Owns all Manager Plans HTTP operations and keeps every Plans API contract behind one canonical module API file.

import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { managerPlansChangeRequestResponseSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansChangeRequestSchema';
import { managerPlansMembershipOverviewSchema, managerPlansActionResponseSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansMembershipSchema';
import { planSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansSchema';
import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import type { ManagerPlansChangeRequestPayload, ManagerPlansChangeRequestResponse } from '@/app/manager/plans/plans_types/ManagerPlansChangeRequestTypes';
import type { ManagerPlansMembershipOverview, ManagerPlansActivatePayload, ManagerPlansRenewPayload, ManagerPlansFreezePayload } from '@/app/manager/plans/plans_types/ManagerPlansMembershipTypes';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import type { ApiResponse } from '@/lib/api';


export const plansApi = {
  fetchPlans: async (params?: Record<string, string>): Promise<ApiResponse<{ plans: Plan[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerPlansUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ plans: z.array(planSchema), total: z.number() }) });
  },
  fetchPlanById: async (id: string): Promise<ApiResponse<Plan>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { dataSchema: planSchema }),
  createPlan: async (body: Partial<Plan>): Promise<ApiResponse<Plan>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema }),
  updatePlan: async (id: string, body: Partial<Plan>): Promise<ApiResponse<Plan>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: planSchema }),
  deletePlan: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) }),
  createChangeRequest: async (body: ManagerPlansChangeRequestPayload): Promise<ApiResponse<ManagerPlansChangeRequestResponse>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.CHANGE_REQUESTS, { method: 'POST', body: JSON.stringify(body), dataSchema: managerPlansChangeRequestResponseSchema }),
  fetchMembershipOverview: async (): Promise<ApiResponse<ManagerPlansMembershipOverview>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_OVERVIEW, { dataSchema: managerPlansMembershipOverviewSchema }),
  activateMembership: async (body: ManagerPlansActivatePayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_ACTIVATE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
  renewMembership: async (body: ManagerPlansRenewPayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_RENEW, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
  freezeMembership: async (body: ManagerPlansFreezePayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_FREEZE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
};
