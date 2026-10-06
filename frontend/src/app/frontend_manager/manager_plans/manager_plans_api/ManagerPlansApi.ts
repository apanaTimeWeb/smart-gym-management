import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { managerPlansChangeRequestResponseSchema } from '@/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansChangeRequestSchema';
import { managerPlansMembershipOverviewSchema, managerPlansActionResponseSchema } from '@/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansMembershipSchema';
import { planSchema } from '@/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansSchema';
import { ManagerPlansUrlConfig } from '@/app/frontend_manager/manager_plans/manager_plans_url_config';
import type { ManagerPlansChangeRequestPayload, ManagerPlansChangeRequestResponse } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansChangeRequestTypes';
import type { ManagerPlansMembershipOverview, ManagerPlansActivatePayload, ManagerPlansRenewPayload, ManagerPlansFreezePayload } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansMembershipTypes';
import type { Plan } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerPlansApi implementation for the plans module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansChangeRequestSchema; @/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansMembershipSchema; @/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansSchema; @/app/frontend_manager/manager_plans/manager_plans_url_config
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerPlansApi = {
  fetchPlans: async (params?: Record<string, string>): Promise<ApiResponse<{ plans: Plan[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerPlansUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ plans: z.array(planSchema), total: z.number() }) });
  },
  fetchPlanById: async (id: string): Promise<ApiResponse<Plan>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { dataSchema: planSchema }),
  createPlan: async (body: Partial<Plan>, idempotencyKey: string): Promise<ApiResponse<Plan>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: planSchema }),
  updatePlan: async (id: string, body: Partial<Plan>, idempotencyKey: string): Promise<ApiResponse<Plan>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: planSchema }),
  deletePlan: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) }),
  createChangeRequest: async (body: ManagerPlansChangeRequestPayload, idempotencyKey: string): Promise<ApiResponse<ManagerPlansChangeRequestResponse>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.CHANGE_REQUESTS, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansChangeRequestResponseSchema }),
  fetchMembershipOverview: async (): Promise<ApiResponse<ManagerPlansMembershipOverview>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_OVERVIEW, { dataSchema: managerPlansMembershipOverviewSchema }),
  activateMembership: async (body: ManagerPlansActivatePayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_ACTIVATE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
  renewMembership: async (body: ManagerPlansRenewPayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_RENEW, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
  freezeMembership: async (body: ManagerPlansFreezePayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_FREEZE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
};
