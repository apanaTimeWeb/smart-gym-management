import { resetSuperadminBackupsMockState } from '@/app/superadmin/system-ops/backups/backups_mocks/handlers/SuperadminBackupsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_BACKUPS } from '@/app/superadmin/system-ops/backups/backups_mocks/fixtures/SuperadminBackupsMockFixtures';

beforeEach(() => {
  resetSuperadminBackupsMockState();
});

describe('Superadmin Backups module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_BACKUPS).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_BACKUPS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
