// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { getSuperadminBackupsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_utils/SuperadminSystemOpsBackupsStatusBadgeConfig';

describe('getSuperadminBackupsStatusBadgeClasses', () => {
  it('exports a callable utility contract', () => {
    expect(typeof getSuperadminBackupsStatusBadgeClasses).toBe('function');
  });
});
