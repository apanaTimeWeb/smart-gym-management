// RESPONSIBILITY: Defines API-key generation validation, response, and modal view contracts for Superadmin Integrations.
import { SUPERADMIN_INTEGRATIONS_KEY_SCOPES } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_constants/SuperadminIntegrationsConstants';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_schemas/SuperadminIntegrationsGenerateApiKeySchema';
import {
  SuperadminGenerateApiKeyResultSchema,
  SuperadminIntegrationTenantSchema,
  SuperadminIntegrationsResponseSchema,
} from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_schemas/SuperadminIntegrationsTypesSchemas';

import type { infer as ZodInfer } from 'zod';


export type SuperadminGenerateApiKeyFormValues = ZodInfer<typeof SuperadminGenerateApiKeyFormSchema>;
export type SuperadminGenerateApiKeyResult = ZodInfer<typeof SuperadminGenerateApiKeyResultSchema>;
export type SuperadminIntegrationTenant = ZodInfer<typeof SuperadminIntegrationTenantSchema>;
export type SuperadminIntegrationsResponseContract = ZodInfer<typeof SuperadminIntegrationsResponseSchema>;

export interface SuperadminGenerateApiKeyMutationInput {
  payload: SuperadminGenerateApiKeyFormValues;
  idempotencyKey: string;
}

export interface SuperadminGenerateApiKeyModalProps {
  isOpen: boolean;
  tenants: SuperadminIntegrationTenant[];
  onClose: () => void;
}
