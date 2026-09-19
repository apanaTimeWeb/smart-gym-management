import { resetSuperadminPlansMockState } from '@/app/superadmin/saas-billing/plans/plans_mocks/handlers/SuperadminPlansMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { INITIAL_PLANS } from '@/app/superadmin/saas-billing/plans/plans_mocks/fixtures/SuperadminPlansMockFixtures';

beforeEach(() => {
  resetSuperadminPlansMockState();
});

describe('Superadmin Plans module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(INITIAL_PLANS).toBeDefined();
    const serialized = JSON.stringify(INITIAL_PLANS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
