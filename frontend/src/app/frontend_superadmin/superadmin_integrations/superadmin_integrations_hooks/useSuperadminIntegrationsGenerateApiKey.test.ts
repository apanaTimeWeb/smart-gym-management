// DATA FLOW: API / URL state / module client state → useSuperadminIntegrationsGenerateApiKey → superadmin_integrations view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminIntegrationsGenerateApiKey } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsGenerateApiKey';

describe('useSuperadminIntegrationsGenerateApiKey', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminIntegrationsGenerateApiKey).toBe('function');
  });
});
