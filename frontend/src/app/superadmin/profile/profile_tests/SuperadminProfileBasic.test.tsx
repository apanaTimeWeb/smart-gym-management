import { resetSuperadminProfileMockState } from '@/app/superadmin/profile/profile_mocks/handlers/SuperadminProfileMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_PROFILE } from '@/app/superadmin/profile/profile_mocks/fixtures/SuperadminProfileMockFixtures';

beforeEach(() => {
  resetSuperadminProfileMockState();
});

describe('Superadmin Profile module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_PROFILE).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_PROFILE);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
