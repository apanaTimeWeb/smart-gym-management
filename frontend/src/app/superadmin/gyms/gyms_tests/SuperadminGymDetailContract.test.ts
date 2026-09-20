import { describe, expect, it } from 'vitest';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymDetailMockFixtures';
import { SuperadminGymDetailDataSchema } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailTypes';

describe('Superadmin Gym Detail contract', () => {
  it('accepts every route-specific fixture', () => {
    for (const fixture of Object.values(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES)) {
      expect(SuperadminGymDetailDataSchema.safeParse(fixture).success).toBe(true);
    }
  });

  it('keeps distinct resource identities distinct in fixture data', () => {
    const ids = Object.keys(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES);
    expect(ids.length).toBeGreaterThan(1);
    expect(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[ids[0]!]!.gymId).not.toBe(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[ids[1]!]!.gymId);
  });
});
