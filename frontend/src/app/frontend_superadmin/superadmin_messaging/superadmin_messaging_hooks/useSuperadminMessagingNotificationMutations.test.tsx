import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';
import { useSuperadminMessagingNotificationMutations } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingNotificationMutations';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi', () => ({ superadminMessagingApi: { markNotificationRead: vi.fn(), markAllNotificationsRead: vi.fn() } }));

describe('useSuperadminMessagingNotificationMutations', () => {
  it('marks one notification read through the API and exposes the read action only while pending', async () => {
    vi.mocked(superadminMessagingApi.markNotificationRead).mockResolvedValue({ success: true, message: 'Read', data: { id: 'n-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminMessagingNotificationMutations(), { wrapper });
    await result.current.markRead('n-1');
    expect(superadminMessagingApi.markNotificationRead).toHaveBeenCalledWith('n-1', expect.any(String));
    expect(result.current.isMarkingRead).toBe(false);
  });
});
