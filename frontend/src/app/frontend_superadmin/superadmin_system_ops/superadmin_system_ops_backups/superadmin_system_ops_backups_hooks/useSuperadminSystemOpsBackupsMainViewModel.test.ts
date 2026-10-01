// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsBackupsMainViewModel → superadmin_system_ops_backups view components.
import { describe, expect, it } from 'vitest';
import { useSuperadminSystemOpsBackupsMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsMainViewModel';

describe('useSuperadminSystemOpsBackupsMainViewModel', () => {
  it('exports the module-owned backups page view-model', () => {
    expect(useSuperadminSystemOpsBackupsMainViewModel).toBeTypeOf('function');
  });
});
