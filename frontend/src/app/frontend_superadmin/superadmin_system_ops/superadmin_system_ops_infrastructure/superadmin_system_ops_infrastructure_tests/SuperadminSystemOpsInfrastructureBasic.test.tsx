// RESPONSIBILITY: Renders the SuperadminSystemOpsInfrastructureBasic.test UI for the system ops feature. Business/data orchestration is delegated to module-owned hooks.
import { describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockFixtures';

describe('Superadmin Infrastructure fixture behavior', () => {
  it('contains distinct tenant IDs and names for the infrastructure tenant picker', () => {
    expect(MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS).toHaveLength(5);
    expect(new Set(MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS.map((tenant) => tenant.id)).size).toBe(5);
    expect(MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS[0]).toMatchObject({ id: 't1', name: 'Iron Paradise' });
  });
});
