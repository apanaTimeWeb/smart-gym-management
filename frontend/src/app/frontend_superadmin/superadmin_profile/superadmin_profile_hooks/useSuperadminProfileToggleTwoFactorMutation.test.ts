// DATA FLOW: API / URL state / module client state → useSuperadminProfileToggleTwoFactorMutation → superadmin_profile view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileToggleTwoFactorMutation";

describe('useSuperadminProfileToggleTwoFactorMutation', () => {
  it('exports useSuperadminProfileToggleTwoFactorMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminProfileToggleTwoFactorMutation).toBe('function');
  });
});
