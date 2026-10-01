// DATA FLOW: API / URL state / module client state → useSuperadminMessagingSendMutation → superadmin_messaging view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingSendMutation";

describe('useSuperadminMessagingSendMutation', () => {
  it('exports useSuperadminMessagingSendMutation from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminMessagingSendMutation).toBe('function');
  });
});
