import { describe, expect, it } from 'vitest';

import { getSuperadminBackupsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsStatusBadgeConfig';



describe('getSuperadminBackupsStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminBackupsStatusBadgeClasses('SUCCESS')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminBackupsStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
