import { describe, expect, it } from 'vitest';

import { useSuperadminIntegrationsGenerateApiKeyForm } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsGenerateApiKeyForm';

describe('useSuperadminIntegrationsGenerateApiKeyForm', () => {
  it('exposes the feature-owned form orchestration contract', () => {
    expect(typeof useSuperadminIntegrationsGenerateApiKeyForm).toBe('function');
  });
});
