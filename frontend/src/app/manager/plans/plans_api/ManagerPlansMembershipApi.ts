import { ManagerPlansUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type {
  ManagerPlansMembershipOverview,
  ManagerPlansActivatePayload,
  ManagerPlansRenewPayload,
  ManagerPlansFreezePayload,
} from '@/app/manager/plans/plans_types/ManagerPlansMembershipTypes';
import { managerPlansMembershipOverviewSchema, managerPlansActionResponseSchema } from '@/app/manager/plans/plans_types/ManagerPlansMembershipSchema';

export const managerPlansMembershipApi = {
  getOverview: async (): Promise<ApiResponse<ManagerPlansMembershipOverview>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_OVERVIEW, { dataSchema: managerPlansMembershipOverviewSchema }),

  activate: async (body: ManagerPlansActivatePayload): Promise<ApiResponse<Record<string, never>>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_ACTIVATE, { method: 'POST', body: JSON.stringify(body), dataSchema: managerPlansActionResponseSchema }),

  renew: async (body: ManagerPlansRenewPayload): Promise<ApiResponse<Record<string, never>>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_RENEW, { method: 'POST', body: JSON.stringify(body), dataSchema: managerPlansActionResponseSchema }),

  freeze: async (body: ManagerPlansFreezePayload): Promise<ApiResponse<Record<string, never>>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_FREEZE, { method: 'POST', body: JSON.stringify(body), dataSchema: managerPlansActionResponseSchema }),
};
