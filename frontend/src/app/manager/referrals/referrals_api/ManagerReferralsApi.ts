import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { managerReferralSchema, managerReferralsKpiSchema } from '@/app/manager/referrals/referrals_schemas/ManagerReferralsSchema';
import { ManagerReferralsUrlConfig } from '@/app/manager/referrals/referrals_url_config';
import type { ManagerReferral, ManagerReferralsKPIs, CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';
import type { ApiResponse } from '@/lib/api';


export const ManagerReferralsApi = {
  fetchReferralKPIs: async (): Promise<ApiResponse<ManagerReferralsKPIs>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.KPIS, { dataSchema: managerReferralsKpiSchema });
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

  claimReward: async (referralId: string, idempotencyKey: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(ManagerReferralsUrlConfig.BACKEND_API.CLAIM(referralId), {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: managerReferralSchema
    });
  } };
