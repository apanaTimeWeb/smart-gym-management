// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsInfrastructureFlushTenantMutation → superadmin_system_ops_infrastructure view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureFlushTenantMutation";

describe('useSuperadminSystemOpsInfrastructureFlushTenantMutation', () => {
  it('exports useSuperadminSystemOpsInfrastructureFlushTenantMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminSystemOpsInfrastructureFlushTenantMutation).toBe('function');
  });
});
