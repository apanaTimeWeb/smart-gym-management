import { resetSuperadminBroadcastsMockState } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_BROADCASTS } from '@/app/superadmin/broadcasts/broadcasts_mocks/fixtures/SuperadminBroadcastsMockFixtures';

beforeEach(() => {
  resetSuperadminBroadcastsMockState();
});

describe('Superadmin Broadcasts module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_BROADCASTS).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_BROADCASTS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
