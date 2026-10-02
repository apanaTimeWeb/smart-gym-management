import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';
import { useSuperadminMessagingV1 } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingV1';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi', () => ({ superadminMessagingApi: { fetchMessages: vi.fn() } }));

describe('useSuperadminMessagingV1', () => {
  it('renders query data from the module API contract', async () => {
    vi.mocked(superadminMessagingApi.fetchMessages).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'm-1', status: 'SENT' }] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminMessagingV1(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.data?.data).toHaveLength(1);
    expect(superadminMessagingApi.fetchMessages).toHaveBeenCalledTimes(1);
  });
});
