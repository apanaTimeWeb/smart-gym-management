// RESPONSIBILITY: Owns feature-specific MSW behavior for Superadmin Integrations, including mutable API-key creation.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import type { ApiResponse } from '@/lib/api';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/superadmin/integrations/integrations_types/SuperadminGenerateApiKeyTypes';
import type { SuperadminGenerateApiKeyResult } from '@/app/superadmin/integrations/integrations_types/SuperadminGenerateApiKeyTypes';
import { SuperadminIntegrationsUrlConfig } from '@/app/superadmin/integrations/superadmin_integrations_url_config';
import { SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE } from '@/app/superadmin/integrations/integrations_mocks/fixtures/SuperadminIntegrationsMockFixtures';

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
      status: 'ACTIVE',
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
