import { AffiliatePayoutRecordSchema, AffiliateRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesTypesSchemas';
import { SuperadminAffiliatesDeleteDataSchema, SuperadminAffiliatesListDataSchema, SuperadminAffiliatesPayoutHistoryDataSchema } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesApiSchema';
import { SuperadminAffiliatesUrlConfig } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { Affiliate, AffiliateFormData, AffiliatePayoutRecord, AffiliateStatus } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';
import type { ApiResponse } from '@/lib/api';

export const affiliatesApi = {
  fetchAffiliates: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Affiliate[]>>(`${SuperadminAffiliatesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: SuperadminAffiliatesListDataSchema });
  },
  createAffiliate: (body: AffiliateFormData, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>(SuperadminAffiliatesUrlConfig.BACKEND_API.BASE, {
    method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliate: (id: string, body: Partial<AffiliateFormData>, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>(`${SuperadminAffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
    method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliateStatus: (id: string, status: AffiliateStatus, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>(`${SuperadminAffiliatesUrlConfig.BACKEND_API.BASE}/${id}/status`, {
    method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify({ status }), dataSchema: AffiliateRecordSchema,
  }),
  deleteAffiliate: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SuperadminAffiliatesUrlConfig.BACKEND_API.BASE}/${id}`, {
    method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminAffiliatesDeleteDataSchema,
  }),
  payAffiliateCommission: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>( `${SuperadminAffiliatesUrlConfig.BACKEND_API.BASE}/${id}/pay`, {
    method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: AffiliateRecordSchema,
  }),
  fetchPayoutHistory: () => apiFetch<ApiResponse<AffiliatePayoutRecord[]>>(`${SuperadminAffiliatesUrlConfig.BACKEND_API.BASE}/payout-history`, { dataSchema: SuperadminAffiliatesPayoutHistoryDataSchema }),
};
