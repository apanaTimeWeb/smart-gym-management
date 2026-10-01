// DATA FLOW: API / URL state / module client state → useSuperadminMessagingCompose → superadmin_messaging view components.
import { describe, expect, it } from 'vitest';
import { useSuperadminMessagingCompose } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingCompose';
import type { SuperadminMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingComposeTypes';
import type { SuperadminMessagingTenant } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';

describe('useSuperadminMessagingCompose', () => {
  it('resolves the selected tenant into the outbound compose payload', () => {
    const tenants = [{ id: 'tenant-a', name: 'Tenant A' }] as SuperadminMessagingTenant[];
    const values = { tenantId: 'tenant-a', channel: 'EMAIL' } as SuperadminMessagingComposeValues;
    expect(useSuperadminMessagingCompose(tenants)(values)).toMatchObject({ tenantId: 'tenant-a', tenantName: 'Tenant A' });
  });

  it('returns null when the selected tenant cannot be resolved', () => {
    const values = { tenantId: 'missing', channel: 'EMAIL' } as SuperadminMessagingComposeValues;
    expect(useSuperadminMessagingCompose([])(values)).toBeNull();
  });
});
