// DATA FLOW: API / URL state / module client state → useSuperadminFeaturesReleaseNoteCreateMutation → superadmin_features view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesReleaseNoteCreateMutation";

describe('useSuperadminFeaturesReleaseNoteCreateMutation', () => {
  it('exports useSuperadminFeaturesReleaseNoteCreateMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminFeaturesReleaseNoteCreateMutation).toBe('function');
  });
});
