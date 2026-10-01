// DATA FLOW: API / URL state / module client state → useSuperadminMessagingNotificationMutations → superadmin_messaging view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminMessagingNotificationMutations } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingNotificationMutations';

describe('useSuperadminMessagingNotificationMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminMessagingNotificationMutations).toBe('function');
  });
});
