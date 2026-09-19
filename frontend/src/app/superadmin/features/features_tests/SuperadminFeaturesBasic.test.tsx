import { resetSuperadminFeaturesMockState } from '@/app/superadmin/features/features_mocks/handlers/SuperadminFeaturesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SUPERADMIN_FEATURE_TENANTS } from '@/app/superadmin/features/features_mocks/fixtures/SuperadminFeaturesMockFixtures';

beforeEach(() => {
  resetSuperadminFeaturesMockState();
});

describe('Superadmin Features module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(SUPERADMIN_FEATURE_TENANTS).toBeDefined();
    const serialized = JSON.stringify(SUPERADMIN_FEATURE_TENANTS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
