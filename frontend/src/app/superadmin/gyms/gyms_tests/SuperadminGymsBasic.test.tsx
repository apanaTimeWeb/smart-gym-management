import { resetSuperadminGymsMockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_GYMS } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsMockFixtures';

beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('Superadmin Gyms module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_GYMS.length).toBe(24);
    const serialized = JSON.stringify(MOCK_GYMS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
