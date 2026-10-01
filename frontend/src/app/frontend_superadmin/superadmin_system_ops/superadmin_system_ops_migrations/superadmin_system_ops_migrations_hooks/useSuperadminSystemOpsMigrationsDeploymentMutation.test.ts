// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsMigrationsDeploymentMutation → superadmin_system_ops_migrations view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_hooks/useSuperadminSystemOpsMigrationsDeploymentMutation";

describe('useSuperadminSystemOpsMigrationsDeploymentMutation', () => {
  it('exports useSuperadminSystemOpsMigrationsDeploymentMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminSystemOpsMigrationsDeploymentMutation).toBe('function');
  });
});
