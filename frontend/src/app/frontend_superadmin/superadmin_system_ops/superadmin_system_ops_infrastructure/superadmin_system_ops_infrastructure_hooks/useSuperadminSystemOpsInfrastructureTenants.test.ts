// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsInfrastructureTenants → superadmin_system_ops_infrastructure view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminSystemOpsInfrastructureTenants } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureTenants';

describe('useSuperadminSystemOpsInfrastructureTenants', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminSystemOpsInfrastructureTenants).toBe('function');
  });
});
