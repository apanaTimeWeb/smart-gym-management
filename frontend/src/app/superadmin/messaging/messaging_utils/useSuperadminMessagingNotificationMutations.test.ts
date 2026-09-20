import { describe, expect, it } from 'vitest';
import { useSuperadminMessagingNotificationMutations } from '@/app/superadmin/messaging/messaging_utils/useSuperadminMessagingNotificationMutations.ts';

describe('useSuperadminMessagingNotificationMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminMessagingNotificationMutations).toBe('function');
  });
});
