// DATA FLOW: API / URL state / module client state → useSuperadminFeaturesFeatureRolloutMutation → superadmin_features view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureRolloutMutation";

describe('useSuperadminFeaturesFeatureRolloutMutation', () => {
  it('exports useSuperadminFeaturesFeatureRolloutMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminFeaturesFeatureRolloutMutation).toBe('function');
  });
});
