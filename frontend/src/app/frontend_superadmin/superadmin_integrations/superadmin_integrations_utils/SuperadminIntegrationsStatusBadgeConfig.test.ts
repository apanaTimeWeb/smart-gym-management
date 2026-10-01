// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { getSuperadminIntegrationsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_utils/SuperadminIntegrationsStatusBadgeConfig';

describe('getSuperadminIntegrationsStatusBadgeClasses', () => {
  it('exports a callable utility contract', () => {
    expect(typeof getSuperadminIntegrationsStatusBadgeClasses).toBe('function');
  });
});
