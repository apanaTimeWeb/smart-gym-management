// RESPONSIBILITY: Defines API-key generation validation, response, and modal view contracts for Superadmin Integrations.
import { z } from 'zod';
import {
  SuperadminGenerateApiKeyResultSchema,
  SuperadminIntegrationTenantSchema,
  SuperadminIntegrationsResponseSchema,
} from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
import { SUPERADMIN_INTEGRATIONS_KEY_SCOPES } from '@/app/superadmin/integrations/integrations_utils/SuperadminIntegrationsConstants';

export const SuperadminGenerateApiKeyFormSchema = z.object({
  label: z.string().trim().min(3, 'Label must be at least 3 characters'),
  tenantId: z.string().min(1, 'Please select a tenant'),
  scopes: z.array(z.enum(SUPERADMIN_INTEGRATIONS_KEY_SCOPES)).min(1, 'Please select at least one scope'),
});

export type SuperadminGenerateApiKeyFormValues = z.infer<typeof SuperadminGenerateApiKeyFormSchema>;
export type SuperadminGenerateApiKeyResult = z.infer<typeof SuperadminGenerateApiKeyResultSchema>;
export type SuperadminIntegrationTenant = z.infer<typeof SuperadminIntegrationTenantSchema>;
export type SuperadminIntegrationsResponseContract = z.infer<typeof SuperadminIntegrationsResponseSchema>;

export interface SuperadminGenerateApiKeyMutationInput {
  payload: SuperadminGenerateApiKeyFormValues;
  idempotencyKey: string;
}

export interface SuperadminGenerateApiKeyModalProps {
  isOpen: boolean;
  tenants: SuperadminIntegrationTenant[];
  onClose: () => void;
}
