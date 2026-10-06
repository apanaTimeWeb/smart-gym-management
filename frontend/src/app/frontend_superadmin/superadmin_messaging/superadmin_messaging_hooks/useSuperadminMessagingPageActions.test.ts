import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminMessagingPageActions } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingPageActions';



const sendMessage = vi.fn();
const markRead = vi.fn();
const markAllRead = vi.fn();
vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessaging', () => ({
  useSuperadminMessaging: () => ({
    tenants: [{ id: 'tenant-1', name: 'Gym Alpha' }],
    sendMessage,
    markRead,
    markAllRead,
  }),
}));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminMessagingPageActions', () => {
  it('rejects an unknown tenant without calling the send mutation and enriches a valid send with tenant name', async () => {
    sendMessage.mockResolvedValue({ success: true, message: 'Sent', data: { id: 'message-1' } });
    const { result } = renderHook(() => useSuperadminMessagingPageActions((key) => key));

    await expect(result.current.handleSend({ tenantId: 'missing' } as never)).resolves.toBe(false);
    expect(sendMessage).not.toHaveBeenCalled();

    await expect(result.current.handleSend({ tenantId: 'tenant-1', body: 'Hello' } as never)).resolves.toBe(true);
    expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ tenantId: 'tenant-1', tenantName: 'Gym Alpha' }));
  });
});
