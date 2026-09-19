// RESPONSIBILITY: Provides isolated API access for Superadmin tenant business controls.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminGymsV1UrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_business_controls_url_config';
import {
  SuperadminGymsV1BulkMutationRequestSchema,
  SuperadminGymsV1DataSchema,
  type SuperadminGymsV1BulkMutationRequest,
  type SuperadminGymsV1Data,
} from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';

export async function fetchGymsBusinessControls(params?: Record<string, string>): Promise<ApiResponse<SuperadminGymsV1Data>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiFetch<ApiResponse<SuperadminGymsV1Data>>(`${SuperadminGymsV1UrlConfig.BACKEND_API.BASE}${query}`, { dataSchema: SuperadminGymsV1DataSchema });
}

export async function updateGymsBulkAction(
  body: SuperadminGymsV1BulkMutationRequest,
  idempotencyKey: string,
): Promise<ApiResponse<SuperadminGymsV1Data>> {
  const payload = SuperadminGymsV1BulkMutationRequestSchema.parse(body);
  return apiFetch<ApiResponse<SuperadminGymsV1Data>>(SuperadminGymsV1UrlConfig.BACKEND_API.BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: SuperadminGymsV1DataSchema,
  });
}
