import { describe, expect, it } from 'vitest';
import { SuperadminBackupsV1DataSchema } from '@/app/superadmin/backups/backups_types/SuperadminBackupsV1Types';
import { SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE } from '@/app/superadmin/backups/backups_mocks/fixtures/SuperadminBackupsV1MockFixtures';
describe('Backup Safety & Restore Readiness contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminBackupsV1DataSchema.safeParse(SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
