import { z } from 'zod';
import { ManagerReferralsUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { managerReferralSchema, managerReferralsKpiSchema } from '@/app/manager/referrals/referrals_types/ManagerReferralsSchema';
import type { ManagerReferral, ManagerReferralsKPIs, CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';

export const ManagerReferralsApi = {
  fetchKPIs: async (): Promise<ApiResponse<ManagerReferralsKPIs>> => {
    return apiFetch(`${ManagerReferralsUrlConfig.BACKEND_API.BASE}/kpis`, { dataSchema: managerReferralsKpiSchema });
  },

  fetchReferrals: async (params: { page: number; limit: number; search?: string; status?: string }): Promise<ApiResponse<ManagerReferral[]>> => {
    const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) });
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== 'ALL') query.set('status', params.status);
    return apiFetch(`${ManagerReferralsUrlConfig.BACKEND_API.BASE}?${query.toString()}`, { dataSchema: z.array(managerReferralSchema) });
  },

  createReferral: async (dto: CreateReferralDto): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(dto),
      dataSchema: managerReferralSchema
    });
  },

  claimReward: async (referralId: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(`${ManagerReferralsUrlConfig.BACKEND_API.BASE}/${referralId}/claim`, {
      method: 'POST',
      dataSchema: managerReferralSchema
    });
  },
};
