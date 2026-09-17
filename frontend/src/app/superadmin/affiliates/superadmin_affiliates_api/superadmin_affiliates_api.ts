import { AffiliateSchema } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
// RESPONSIBILITY: Modularized API client for the Affiliates module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Affiliate } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import { AffiliatesUrlConfig } from '@/app/superadmin/affiliates/superadmin_affiliates_url_config';
import { z } from "zod";
export const affiliatesApi = {
    fetchAffiliates: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<Affiliate[]>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(AffiliateSchema) });
    },
    createAffiliate: (body: Partial<Affiliate>) => apiFetch<ApiResponse<Affiliate>>(AffiliatesUrlConfig.BACKEND_API.BASE, {
        method: 'POST',
        body: JSON.stringify(body),
        dataSchema: AffiliateSchema
    }),
    updateAffiliate: (id: string, body: Partial<Affiliate>) => apiFetch<ApiResponse<Affiliate>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        dataSchema: AffiliateSchema
    }),
    updateStatus: (id: string, status: string) => apiFetch<ApiResponse<Affiliate>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        dataSchema: AffiliateSchema
    }),
    deleteAffiliate: (id: string) => apiFetch<ApiResponse<void>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'DELETE',
        dataSchema: z.object({}).passthrough()
    }),
    payCommission: (id: string) => apiFetch<ApiResponse<void>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}/pay`, {
        method: 'POST',
        dataSchema: z.object({}).passthrough()
    }),
};
