// RESPONSIBILITY: Owns feature-specific MSW behavior for Superadmin Integrations, including mutable API-key creation.
import { SUPERADMIN_INTEGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_constants/SuperadminIntegrationsConstants';
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_mocks/superadmin_integrations_mocks_fixtures/SuperadminIntegrationsMockFixtures';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_schemas/SuperadminIntegrationsGenerateApiKeySchema';
import { SuperadminIntegrationsUrlConfig } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_url_config';

import type { SuperadminGenerateApiKeyResult } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_types/SuperadminIntegrationsGenerateApiKeyTypes';
import type { ApiResponse } from '@/lib/api';

let mockIntegrations = structuredClone(SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE);
const idempotentResults = new Map<string, ApiResponse<SuperadminGenerateApiKeyResult>>();

export function resetSuperadminIntegrationsMockState(): void {
  mockIntegrations = structuredClone(SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE);
  idempotentResults.clear();
}

export const superadminIntegrationsHandlers = [
  http.get('*' + SuperadminIntegrationsUrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin integrations data loaded.', data: mockIntegrations })),
  http.post('*' + SuperadminIntegrationsUrlConfig.BACKEND_API.GENERATE_API_KEY, async ({ request }) => {
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (idempotencyKey) {
      const replay = idempotentResults.get(idempotencyKey);
      if (replay) return HttpResponse.json(replay);
    }

    const parsed = SuperadminGenerateApiKeyFormSchema.safeParse(await request.json());
    if (!parsed.success) {
      return HttpResponse.json<ApiResponse<SuperadminGenerateApiKeyResult>>({ success: false, message: 'Invalid API key request.', data: null }, { status: StatusCodes.BAD_REQUEST });
    }

    const tenant = mockIntegrations.tenants.find((item) => item.id === parsed.data.tenantId);
    if (!tenant) {
      return HttpResponse.json<ApiResponse<SuperadminGenerateApiKeyResult>>({ success: false, message: 'Selected tenant was not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    }

    const suffix = String(mockIntegrations.keys.length + 1);
    const generatedKey = {
      id: `key${Date.now()}`,
      tenant: tenant.name,
      label: parsed.data.label,
      status: SUPERADMIN_INTEGRATION_STATUS_CODES.ACTIVE,
      lastUsed: null,
      rateLimit: '120/min',
    };
    const result: ApiResponse<SuperadminGenerateApiKeyResult> = {
      success: true,
      message: 'API key generated successfully.',
      data: {
        key: generatedKey,
        secretKey: `sg360_${tenant.id}_${suffix}_${crypto.randomUUID().replaceAll('-', '')}`,
      },
    };

    mockIntegrations = { ...mockIntegrations, keys: [generatedKey, ...mockIntegrations.keys] };
    if (idempotencyKey) idempotentResults.set(idempotencyKey, result);
    return HttpResponse.json(result);
  }),
];
