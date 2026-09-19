// RESPONSIBILITY: Provides API access for the Superadmin integrations feature. Demo behavior is supplied by module-owned MSW handlers.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminIntegrationsUrlConfig } from '@/app/superadmin/integrations/superadmin_integrations_url_config';
import { SuperadminIntegrationsResponseSchema } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
import type { SuperadminIntegrationsResponse } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
export async function fetchIntegrations(): Promise<ApiResponse<SuperadminIntegrationsResponse>> {
    return apiFetch<ApiResponse<SuperadminIntegrationsResponse>>(SuperadminIntegrationsUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminIntegrationsResponseSchema });
}
