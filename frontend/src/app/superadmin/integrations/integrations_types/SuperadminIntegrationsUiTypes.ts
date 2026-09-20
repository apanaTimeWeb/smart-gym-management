import { z } from 'zod';

export const generateApiKeySchema = z.object({
  label: z.string().min(3, 'Label must be at least 3 characters'),
  tenantId: z.string().min(1, 'Please select a tenant'),
  scopes: z.array(z.string()).min(1, 'Please select at least one scope'),
});

export type GenerateApiKeyFormValues = z.infer<typeof generateApiKeySchema>;

export interface SuperadminGenerateApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
