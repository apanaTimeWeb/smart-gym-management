// RESPONSIBILITY: Verifies the Superadmin Features tier-matrix configuration contract.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_FEATURE_TIER_IDS, SUPERADMIN_FEATURE_IDS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_constants/SuperadminFeaturesTierMatrixConstants';



describe('SuperadminFeaturesTierMatrixConstants', () => {
  it('defines the supported SaaS tiers in canonical order', () => {
    expect(SUPERADMIN_FEATURE_TIER_IDS).toEqual(['basic', 'pro', 'enterprise']);
  });
  it('defines unique feature identifiers for every matrix row', () => {
    expect(SUPERADMIN_FEATURE_IDS).toHaveLength(6);
    expect(new Set(SUPERADMIN_FEATURE_IDS).size).toBe(SUPERADMIN_FEATURE_IDS.length);
    expect(SUPERADMIN_FEATURE_IDS).toContain('analytics');
    expect(SUPERADMIN_FEATURE_IDS).toContain('franchise');
  });
});
