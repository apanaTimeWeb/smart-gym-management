import { resetSuperadminBranchesMockState } from '@/app/superadmin/branches/branches_mocks/handlers/SuperadminBranchesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_BRANCHES } from '@/app/superadmin/branches/branches_mocks/fixtures/SuperadminBranchesMockFixtures';

beforeEach(() => {
  resetSuperadminBranchesMockState();
});

describe('Superadmin Branches module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_BRANCHES).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_BRANCHES);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
