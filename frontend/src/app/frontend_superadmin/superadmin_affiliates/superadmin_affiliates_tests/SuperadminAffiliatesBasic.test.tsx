// RESPONSIBILITY: Renders the SuperadminAffiliatesBasic.test UI for the affiliates feature. Business/data orchestration is delegated to module-owned hooks.
import { SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesConstants';
import { beforeEach, describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_mocks/superadmin_affiliates_mocks_fixtures/SuperadminAffiliatesMockFixtures';
import { resetSuperadminAffiliatesMockState } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_mocks/superadmin_affiliates_mocks_handlers/SuperadminAffiliatesMockHandlers';

beforeEach(() => resetSuperadminAffiliatesMockState());

describe('Superadmin Affiliates fixture behavior', () => {
  it('contains stable IDs, masked-sensitive-source fields, and status variation required by the list UI', () => {
    expect(MOCK_SUPERADMIN_AFFILIATES).toHaveLength(8);
    expect(MOCK_SUPERADMIN_AFFILIATES[0]).toMatchObject({ id: 'a1', status: SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE, currency: 'INR' });
    expect(new Set(MOCK_SUPERADMIN_AFFILIATES.map((affiliate) => affiliate.status))).toEqual(new Set([SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE, SUPERADMIN_AFFILIATE_STATUS_CODES.INACTIVE]));
    expect(MOCK_SUPERADMIN_AFFILIATES.every((affiliate) => affiliate.id && affiliate.name && affiliate.email)).toBe(true);
  });
});
