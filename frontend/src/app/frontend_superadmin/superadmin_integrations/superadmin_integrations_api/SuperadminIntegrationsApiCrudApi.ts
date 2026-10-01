// RESPONSIBILITY: Provides API access for the Superadmin Integrations feature. All server communication is contract-validated.
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_schemas/SuperadminIntegrationsGenerateApiKeySchema';
import { SuperadminIntegrationsResponseSchema, SuperadminGenerateApiKeyResultSchema } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_schemas/SuperadminIntegrationsTypesSchemas';
import { SuperadminIntegrationsUrlConfig } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminGenerateApiKeyFormValues, SuperadminGenerateApiKeyResult } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_types/SuperadminIntegrationsGenerateApiKeyTypes';
import type { SuperadminIntegrationsResponse } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_types/SuperadminIntegrationsTypes';
import type { ApiResponse } from '@/lib/api';

export async function fetchIntegrations(): Promise<ApiResponse<SuperadminIntegrationsResponse>> {
  return apiFetch<ApiResponse<SuperadminIntegrationsResponse>>(SuperadminIntegrationsUrlConfig.BACKEND_API.BASE, {
    dataSchema: SuperadminIntegrationsResponseSchema,
  });
}

/**
 * Purpose: Creates one tenant-scoped developer API key and validates the response before UI consumption.
 * Side effects: Sends the caller-supplied idempotency key to prevent duplicate creation from repeated submission.
 */
export async function generateSuperadminApiKey(
  payload: SuperadminGenerateApiKeyFormValues,
  idempotencyKey: string,
): Promise<ApiResponse<SuperadminGenerateApiKeyResult>> {
  const validatedPayload = SuperadminGenerateApiKeyFormSchema.parse(payload);
  return apiFetch<ApiResponse<SuperadminGenerateApiKeyResult>>(SuperadminIntegrationsUrlConfig.BACKEND_API.GENERATE_API_KEY, {
    method: 'POST',
    body: JSON.stringify(validatedPayload),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: SuperadminGenerateApiKeyResultSchema,
  });
}
