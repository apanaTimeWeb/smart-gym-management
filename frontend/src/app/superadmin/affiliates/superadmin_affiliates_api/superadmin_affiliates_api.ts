// RESPONSIBILITY: Modularized API client for the Affiliates module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Affiliate } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import { AffiliatesUrlConfig } from '@/app/superadmin/affiliates/affiliates_url_config';
import { z } from "zod";

export const affiliatesApi = {
  fetchAffiliates: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Affiliate[]>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.unknown() });
  },
  createAffiliate: (body: Partial<Affiliate>) =>
    apiFetch<ApiResponse<Affiliate>>(AffiliatesUrlConfig.BACKEND_API.BASE, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: z.unknown()
    }),
  updateAffiliate: (id: string, body: Partial<Affiliate>) =>
    apiFetch<ApiResponse<Affiliate>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: z.unknown()
    }),
  updateStatus: (id: string, status: string) =>
    apiFetch<ApiResponse<Affiliate>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
        dataSchema: z.unknown()
    }),
  deleteAffiliate: (id: string) =>
    apiFetch<ApiResponse<void>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'DELETE',
        dataSchema: z.unknown()
    }),
  payCommission: (id: string) =>
    apiFetch<ApiResponse<void>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}/pay`, {
      method: 'POST',
        dataSchema: z.unknown()
    }),
};
