import { SuperadminGymsV1DataSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsV1ContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import type {
  SuperadminGymsV1BulkMutationRequestSchema, SuperadminGymsV1BulkMutationRequest, SuperadminGymsV1Data } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsV1Types';
import type { ApiResponse } from '@/lib/api';



export async function fetchGymsBusinessControls(params?: Record<string, string>): Promise<ApiResponse<SuperadminGymsV1Data>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiFetch<ApiResponse<SuperadminGymsV1Data>>(`${MODULE_URLS.BUSINESS_CONTROLS.BACKEND_API.BASE}${query}`, { dataSchema: SuperadminGymsV1DataSchema });
}

export async function updateGymsBulkAction(
  body: SuperadminGymsV1BulkMutationRequest,
  idempotencyKey: string,
): Promise<ApiResponse<SuperadminGymsV1Data>> {
  const payload = SuperadminGymsV1BulkMutationRequestSchema.parse(body);
  return apiFetch<ApiResponse<SuperadminGymsV1Data>>(MODULE_URLS.BUSINESS_CONTROLS.BACKEND_API.BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: SuperadminGymsV1DataSchema,
  });
}
