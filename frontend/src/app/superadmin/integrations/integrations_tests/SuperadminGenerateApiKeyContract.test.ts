import { describe, expect, it } from 'vitest';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/superadmin/integrations/integrations_types/SuperadminGenerateApiKeyTypes';

describe('SuperadminGenerateApiKeyFormSchema', () => {
  it('rejects an incomplete API-key request', () => {
    const result = SuperadminGenerateApiKeyFormSchema.safeParse({ label: '', tenantId: '', scopes: [] });
    expect(result.success).toBe(false);
  });

  it('accepts a valid tenant-scoped API-key request', () => {
    const result = SuperadminGenerateApiKeyFormSchema.safeParse({ label: 'Zapier Integration', tenantId: 't1', scopes: ['Read'] });
    expect(result.success).toBe(true);
  });
});
