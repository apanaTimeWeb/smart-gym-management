import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ManagerReferral, ManagerReferralsKPIs, CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';

export const ManagerReferralsApi = {
  fetchKPIs: async (): Promise<ApiResponse<ManagerReferralsKPIs>> => {
    return apiFetch(`/manager/referrals/kpis`);
  },

  fetchReferrals: async (): Promise<ApiResponse<ManagerReferral[]>> => {
    return apiFetch(`/manager/referrals`);
  },

  createReferral: async (dto: CreateReferralDto): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(`/manager/referrals`, {
      method: 'POST',
      body: JSON.stringify(dto)
    });
  },

  claimReward: async (referralId: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(`/manager/referrals/${referralId}/claim`, {
      method: 'POST'
    });
  },
};
