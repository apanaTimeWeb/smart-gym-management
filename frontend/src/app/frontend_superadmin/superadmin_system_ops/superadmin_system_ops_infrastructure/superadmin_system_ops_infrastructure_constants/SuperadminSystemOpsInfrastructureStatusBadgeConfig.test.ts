import { describe, expect, it } from 'vitest';

import { getSuperadminInfrastructureStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureStatusBadgeConfig';



describe('getSuperadminInfrastructureStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminInfrastructureStatusBadgeClasses('HEALTHY')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminInfrastructureStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
