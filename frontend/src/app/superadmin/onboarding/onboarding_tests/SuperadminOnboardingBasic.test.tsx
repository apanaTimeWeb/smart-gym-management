import { resetSuperadminOnboardingMockState } from '@/app/superadmin/onboarding/onboarding_mocks/handlers/SuperadminOnboardingMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_ONBOARDINGS } from '@/app/superadmin/onboarding/onboarding_mocks/fixtures/SuperadminOnboardingMockFixtures';

beforeEach(() => {
  resetSuperadminOnboardingMockState();
});

describe('Superadmin Onboarding module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_ONBOARDINGS).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_ONBOARDINGS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
