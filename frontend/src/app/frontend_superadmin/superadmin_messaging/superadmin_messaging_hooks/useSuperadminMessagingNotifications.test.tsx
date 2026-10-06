import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminMessagingNotifications } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingNotifications';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi', () => ({ superadminMessagingApi: vi.fn() }));
describe('useSuperadminMessagingNotifications', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(superadminMessagingApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminMessagingNotifications(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
