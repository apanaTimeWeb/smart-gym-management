// DATA FLOW: API / URL state / module client state → useSuperadminProfileUpdateProfileMutation → superadmin_profile view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileUpdateProfileMutation";

describe('useSuperadminProfileUpdateProfileMutation', () => {
  it('exports useSuperadminProfileUpdateProfileMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminProfileUpdateProfileMutation).toBe('function');
  });
});
