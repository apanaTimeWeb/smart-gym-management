// RESPONSIBILITY: Verifies backup scheduling constraints used by the schedule form.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_BACKUPS_DEFAULT_CRON, SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS, SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsScheduleConstants';



describe('SuperadminSystemOpsBackupsScheduleConstants', () => {
  it('uses a valid nightly default cron expression', () => {
    expect(SUPERADMIN_BACKUPS_DEFAULT_CRON).toBe('0 2 * * *');
  });
  it('keeps retention bounds ordered and practical', () => {
    expect(SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS).toBe(1);
    expect(SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS).toBe(365);
    expect(SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS).toBeGreaterThan(SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS);
  });
});
