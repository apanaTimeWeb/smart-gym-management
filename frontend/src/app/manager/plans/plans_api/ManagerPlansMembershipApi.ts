import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type {
  ManagerPlansMembershipOverview,
  ManagerPlansActivatePayload,
  ManagerPlansRenewPayload,
  ManagerPlansFreezePayload,
} from '@/app/manager/plans/plans_types/ManagerPlansMembershipTypes';
import { managerPlansMembershipOverviewSchema, managerPlansActionResponseSchema } from '@/app/manager/plans/plans_types/ManagerPlansMembershipSchema';

export const managerPlansMembershipApi = {
  fetchMembershipOverview: async (): Promise<ApiResponse<ManagerPlansMembershipOverview>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_OVERVIEW, { dataSchema: managerPlansMembershipOverviewSchema }),

  activateMembership: async (body: ManagerPlansActivatePayload): Promise<ApiResponse<Record<string, never>>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_ACTIVATE, { method: 'POST', body: JSON.stringify(body), dataSchema: managerPlansActionResponseSchema }),

  renewMembership: async (body: ManagerPlansRenewPayload): Promise<ApiResponse<Record<string, never>>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_RENEW, { method: 'POST', body: JSON.stringify(body), dataSchema: managerPlansActionResponseSchema }),

  freezeMembership: async (body: ManagerPlansFreezePayload): Promise<ApiResponse<Record<string, never>>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_FREEZE, { method: 'POST', body: JSON.stringify(body), dataSchema: managerPlansActionResponseSchema }),
};
