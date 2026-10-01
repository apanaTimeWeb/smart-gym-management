// DATA FLOW: API / URL state / module client state → useSuperadminProfileUpdatePasswordMutation → superadmin_profile view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileUpdatePasswordMutation";

describe('useSuperadminProfileUpdatePasswordMutation', () => {
  it('exports useSuperadminProfileUpdatePasswordMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminProfileUpdatePasswordMutation).toBe('function');
  });
});
