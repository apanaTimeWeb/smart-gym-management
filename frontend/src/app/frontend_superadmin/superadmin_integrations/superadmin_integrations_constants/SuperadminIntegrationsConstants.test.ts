// RESPONSIBILITY: Verifies the supported integration API-key scopes.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_INTEGRATIONS_KEY_SCOPES } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_constants/SuperadminIntegrationsConstants';



describe('SuperadminIntegrationsConstants', () => {
  it('exposes only the documented read/write scopes in deterministic order', () => {
    expect(SUPERADMIN_INTEGRATIONS_KEY_SCOPES).toEqual(['Read', 'Write']);
    expect(new Set(SUPERADMIN_INTEGRATIONS_KEY_SCOPES).size).toBe(SUPERADMIN_INTEGRATIONS_KEY_SCOPES.length);
  });
});
