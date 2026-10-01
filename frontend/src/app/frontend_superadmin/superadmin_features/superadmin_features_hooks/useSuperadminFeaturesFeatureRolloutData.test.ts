// DATA FLOW: API / URL state / module client state → useSuperadminFeaturesFeatureRolloutData → superadmin_features view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminFeaturesFeatureRolloutData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureRolloutData';

describe('useSuperadminFeaturesFeatureRolloutData', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminFeaturesFeatureRolloutData).toBe('function');
  });
});
