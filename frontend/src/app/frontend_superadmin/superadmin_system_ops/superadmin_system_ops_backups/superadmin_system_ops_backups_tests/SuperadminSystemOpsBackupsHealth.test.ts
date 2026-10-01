import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_fixtures/SuperadminSystemOpsBackupsV1MockFixtures';
import { resetSuperadminBackupsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_handlers/SuperadminSystemOpsBackupsMockHandlers';
import { SuperadminBackupsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsV1Schema';

beforeEach(() => {
  resetSuperadminBackupsMockState();
});

describe('Backup Safety & Restore Readiness contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminBackupsV1DataSchema.safeParse(SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
