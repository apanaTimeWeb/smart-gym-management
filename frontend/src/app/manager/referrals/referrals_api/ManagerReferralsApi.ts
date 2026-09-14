import { ManagerReferralsUrlConfig } from '@/app/manager/referrals/referrals_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ManagerReferral, ManagerReferralsKPIs, CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';

export const ManagerReferralsApi = {
  fetchKPIs: async (): Promise<ApiResponse<ManagerReferralsKPIs>> => {
    return apiFetch(`${ManagerReferralsUrlConfig.BACKEND_API.BASE}/kpis`);
  },

  fetchReferrals: async (): Promise<ApiResponse<ManagerReferral[]>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.BASE);
  },

  createReferral: async (dto: CreateReferralDto): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(dto)
    });
  },

  claimReward: async (referralId: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(`${ManagerReferralsUrlConfig.BACKEND_API.BASE}/${referralId}/claim`, {
      method: 'POST'
    });
  },
};
