import { SuperadminIntegrationTenantSchema, SuperadminIntegrationKeySchema, SuperadminGenerateApiKeyResultSchema, SuperadminIntegrationsResponseSchema } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_schemas/SuperadminIntegrationsTypesSchemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the typed response contract for this Superadmin module.
export type SuperadminIntegrationsResponse = ZodInfer<typeof SuperadminIntegrationsResponseSchema>;

export interface SuperadminIntegrationsSectionProps {
    data: SuperadminIntegrationsResponse;
}

export type SuperadminIntegrationTenant = ZodInfer<typeof SuperadminIntegrationTenantSchema>;
export type SuperadminIntegrationKey = ZodInfer<typeof SuperadminIntegrationKeySchema>;
export type SuperadminGenerateApiKeyResult = ZodInfer<typeof SuperadminGenerateApiKeyResultSchema>;
