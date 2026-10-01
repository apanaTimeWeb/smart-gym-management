// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsBackupsSchedule → superadmin_system_ops_backups view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminSystemOpsBackupsSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsSchedule';

describe('useSuperadminSystemOpsBackupsSchedule', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminSystemOpsBackupsSchedule).toBe('function');
  });
});
