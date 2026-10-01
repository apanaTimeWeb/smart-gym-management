// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsBackupsActions → superadmin_system_ops_backups view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminSystemOpsBackupsActions } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsActions';

describe('useSuperadminSystemOpsBackupsActions', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminSystemOpsBackupsActions).toBe('function');
  });
});
