import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { MANAGER_REFERRALS_STATUS_VALUES } from '@/app/frontend_manager/manager_referrals/manager_referrals_constants/ManagerReferralsConstants';
import { managerReferralSchema, managerReferralsKpiSchema } from '@/app/frontend_manager/manager_referrals/manager_referrals_schemas/ManagerReferralsSchema';
import { ManagerReferralsUrlConfig } from '@/app/frontend_manager/manager_referrals/manager_referrals_url_config';
import type { ManagerReferral, ManagerReferralsKPIs, CreateReferralDto } from '@/app/frontend_manager/manager_referrals/manager_referrals_types/ManagerReferralsTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerReferralsApi implementation for the referrals module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_referrals/manager_referrals_schemas/ManagerReferralsSchema; @/app/frontend_manager/manager_referrals/manager_referrals_url_config; @/app/frontend_manager/manager_referrals/manager_referrals_types/ManagerReferralsTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerReferralsApi = {
  fetchReferralKPIs: async (): Promise<ApiResponse<ManagerReferralsKPIs>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.KPIS, { dataSchema: managerReferralsKpiSchema });
  },

  fetchReferrals: async (params: { page: number; limit: number; search?: string; status?: string }): Promise<ApiResponse<ManagerReferral[]>> => {
    const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) });
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== MANAGER_REFERRALS_STATUS_VALUES.ALL) query.set('status', params.status);
    return apiFetch(`${ManagerReferralsUrlConfig.BACKEND_API.BASE}?${query.toString()}`, { dataSchema: z.array(managerReferralSchema) });
  },

  createReferral: async (dto: CreateReferralDto, idempotencyKey: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: managerReferralSchema
    });
  },

  claimReward: async (referralId: string, idempotencyKey: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.CLAIM(referralId), {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: managerReferralSchema
    });
  } };
