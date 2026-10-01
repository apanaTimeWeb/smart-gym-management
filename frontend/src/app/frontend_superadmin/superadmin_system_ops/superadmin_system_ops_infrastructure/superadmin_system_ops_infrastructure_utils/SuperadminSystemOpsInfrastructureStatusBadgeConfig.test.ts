// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { getSuperadminInfrastructureStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_utils/SuperadminSystemOpsInfrastructureStatusBadgeConfig';

describe('getSuperadminInfrastructureStatusBadgeClasses', () => {
  it('exports a callable utility contract', () => {
    expect(typeof getSuperadminInfrastructureStatusBadgeClasses).toBe('function');
  });
});
