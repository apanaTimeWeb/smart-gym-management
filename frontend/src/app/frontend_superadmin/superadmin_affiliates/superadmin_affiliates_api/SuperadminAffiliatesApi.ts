import { AffiliateRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesTypesSchemas';
import { SuperadminAffiliatesListDataSchema, SuperadminAffiliatesPayoutHistoryDataSchema, SuperadminAffiliatesDeleteDataSchema } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesApiSchema';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesApi owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesTypesSchemas, @/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesApiSchema, @/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_url_config, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { Affiliate, AffiliateFormData, AffiliatePayoutRecord, AffiliateStatus } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';
import type { ApiResponse } from '@/lib/api';



export const affiliatesApi = {
  fetchAffiliates: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Affiliate[]>>(`${MODULE_URLS.BACKEND_API.BASE}${q}`, { dataSchema: SuperadminAffiliatesListDataSchema });
  },
  createAffiliate: (body: AffiliateFormData, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>(MODULE_URLS.BACKEND_API.BASE, {
    method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliate: (id: string, body: Partial<AffiliateFormData>, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}`, {
    method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliateStatus: (id: string, status: AffiliateStatus, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}/status`, {
    method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify({ status }), dataSchema: AffiliateRecordSchema,
  }),
  deleteAffiliate: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}`, {
    method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminAffiliatesDeleteDataSchema,
  }),
  payAffiliateCommission: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<Affiliate>>( `${MODULE_URLS.BACKEND_API.BASE}/${id}/pay`, {
    method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: AffiliateRecordSchema,
  }),
  fetchPayoutHistory: () => apiFetch<ApiResponse<AffiliatePayoutRecord[]>>(`${MODULE_URLS.BACKEND_API.BASE}/payout-history`, { dataSchema: SuperadminAffiliatesPayoutHistoryDataSchema }),
};
