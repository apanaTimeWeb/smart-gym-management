import { resetSuperadminAffiliatesMockState } from '@/app/superadmin/affiliates/affiliates_mocks/handlers/SuperadminAffiliatesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/superadmin/affiliates/affiliates_mocks/fixtures/SuperadminAffiliatesMockFixtures';

beforeEach(() => {
  resetSuperadminAffiliatesMockState();
});

describe('Superadmin Affiliates module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_AFFILIATES).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_AFFILIATES);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
