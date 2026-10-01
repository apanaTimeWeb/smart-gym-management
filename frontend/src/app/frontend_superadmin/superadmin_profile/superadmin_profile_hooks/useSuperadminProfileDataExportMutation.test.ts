// DATA FLOW: API / URL state / module client state → useSuperadminProfileDataExportMutation → superadmin_profile view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileDataExportMutation";

describe('useSuperadminProfileDataExportMutation', () => {
  it('exports the asynchronous data-export mutation boundary', () => {
    expect(typeof subject.useSuperadminProfileDataExportMutation).toBe('function');
  });
});
