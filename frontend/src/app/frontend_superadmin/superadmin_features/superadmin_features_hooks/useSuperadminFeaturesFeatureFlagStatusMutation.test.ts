// DATA FLOW: API / URL state / module client state → useSuperadminFeaturesFeatureFlagStatusMutation → superadmin_features view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureFlagStatusMutation";

describe('useSuperadminFeaturesFeatureFlagStatusMutation', () => {
  it('exports useSuperadminFeaturesFeatureFlagStatusMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminFeaturesFeatureFlagStatusMutation).toBe('function');
  });
});
