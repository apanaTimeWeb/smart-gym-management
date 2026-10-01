// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsBackupsScheduleQuery → superadmin_system_ops_backups view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsScheduleQuery";

describe('useSuperadminSystemOpsBackupsScheduleQuery', () => {
  it('exports useSuperadminSystemOpsBackupsScheduleQuery from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminSystemOpsBackupsScheduleQuery).toBe('function');
  });
});
