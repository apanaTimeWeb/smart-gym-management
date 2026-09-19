import { resetSuperadminFranchisesMockState } from '@/app/superadmin/franchises/franchises_mocks/handlers/SuperadminFranchisesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_FRANCHISES } from '@/app/superadmin/franchises/franchises_mocks/fixtures/SuperadminFranchisesMockFixtures';

beforeEach(() => {
  resetSuperadminFranchisesMockState();
});

describe('Superadmin Franchises module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_FRANCHISES).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_FRANCHISES);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
