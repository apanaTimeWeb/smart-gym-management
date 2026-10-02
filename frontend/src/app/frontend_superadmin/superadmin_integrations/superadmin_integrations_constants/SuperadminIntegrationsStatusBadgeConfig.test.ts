import { describe, expect, it } from 'vitest';

import { getSuperadminIntegrationsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_constants/SuperadminIntegrationsStatusBadgeConfig';



describe('getSuperadminIntegrationsStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminIntegrationsStatusBadgeClasses('CONNECTED')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminIntegrationsStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
