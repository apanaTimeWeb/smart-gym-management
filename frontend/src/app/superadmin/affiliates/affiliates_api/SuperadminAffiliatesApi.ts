import { AffiliatePayoutRecordSchema, AffiliateRecordSchema } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
// RESPONSIBILITY: Owns the API boundary for Superadmin Affiliates and validates response payloads before the view layer consumes them.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Affiliate, AffiliateFormData, AffiliatePayoutRecord, AffiliateStatus } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import { AffiliatesUrlConfig } from '@/app/superadmin/affiliates/superadmin_affiliates_url_config';
import { z } from 'zod';

export const affiliatesApi = {
  fetchAffiliates: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Affiliate[]>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(AffiliateRecordSchema) });
  },
  createAffiliate: (body: AffiliateFormData, idempotencyKey?: string) => apiFetch<ApiResponse<Affiliate>>(AffiliatesUrlConfig.BACKEND_API.BASE, {
    method: 'POST', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliate: (id: string, body: Partial<AffiliateFormData>, idempotencyKey?: string) => apiFetch<ApiResponse<Affiliate>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
    method: 'PATCH', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliateStatus: (id: string, status: AffiliateStatus, idempotencyKey?: string) => apiFetch<ApiResponse<Affiliate>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}/status`, {
    method: 'PATCH', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, body: JSON.stringify({ status }), dataSchema: AffiliateRecordSchema,
  }),
  deleteAffiliate: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
    method: 'DELETE', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: z.null(),
  }),
  payAffiliateCommission: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<Affiliate>>( `${AffiliatesUrlConfig.BACKEND_API.BASE}/${id}/pay`, {
    method: 'POST', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: AffiliateRecordSchema,
  }),
  fetchPayoutHistory: () => apiFetch<ApiResponse<AffiliatePayoutRecord[]>>(`${AffiliatesUrlConfig.BACKEND_API.BASE}/payout-history`, { dataSchema: z.array(AffiliatePayoutRecordSchema) }),
};
