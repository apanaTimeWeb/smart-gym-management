import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';
import { useSuperadminMessagingSendMutation } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingSendMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi', () => ({ superadminMessagingApi: { sendMessage: vi.fn() } }));
const mockedSend = vi.mocked(superadminMessagingApi.sendMessage);

describe('useSuperadminMessagingSendMutation', () => {
  it('forwards the validated payload through the API and reconciles the message query on success', async () => {
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    vi.spyOn(client, 'invalidateQueries');
    mockedSend.mockResolvedValue({ success: true, message: 'Sent', data: { id: 'message-1' } } as never);
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminMessagingSendMutation(), { wrapper });

    await result.current.mutateAsync({ tenantId: 'tenant-1', body: 'Hello' } as never);
    expect(mockedSend).toHaveBeenCalledWith(expect.objectContaining({ tenantId: 'tenant-1', body: 'Hello' }), expect.any(String));
    expect(client.invalidateQueries).toHaveBeenCalled();
  });
});
