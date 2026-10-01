import { z } from 'zod';

export const SuperadminGenerateApiKeyFormSchema = z.object({
  label: z.string().trim().min(3, 'Label must be at least 3 characters'),
  tenantId: z.string().min(1, 'Please select a tenant'),
  scopes: z.array(z.enum(SUPERADMIN_INTEGRATIONS_KEY_SCOPES)).min(1, 'Please select at least one scope'),
});
