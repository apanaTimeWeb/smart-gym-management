// DATA FLOW: API / URL state / module client state → useSuperadminMessagingSocketEvent → superadmin_messaging view components.
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminMessagingSocketEvent } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingSocketEvent';



const subscribe = vi.fn(() => vi.fn());
vi.mock('@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutSocketProvider', () => ({
  useSuperadminSocket: () => ({ subscribe }),
}));

describe('useSuperadminMessagingSocketEvent', () => {
  it('subscribes the owning Messaging feature to both required socket events', () => {
    const callback = vi.fn();
    renderHook(() => useSuperadminMessagingSocketEvent(callback));
    expect(subscribe).toHaveBeenCalledWith('notification.received', callback);
    expect(subscribe).toHaveBeenCalledWith('chat_message', callback);
  });
});
