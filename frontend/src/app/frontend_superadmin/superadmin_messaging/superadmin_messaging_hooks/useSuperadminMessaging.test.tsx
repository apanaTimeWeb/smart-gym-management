// RESPONSIBILITY: Renders the useSuperadminMessaging.test UI for the messaging feature. Business/data orchestration is delegated to module-owned hooks.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {describe, expect, it, vi, beforeEach} from 'vitest';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';
import { useSuperadminMessaging } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessaging';
import { resetSuperadminMessagingMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';

import type { ReactNode } from 'react';



const mockedUseUrlState = vi.hoisted(() => ({
  getParam: vi.fn((key: string, defaultValue = '') => key === 'search' ? 'iron' : defaultValue),
  setParams: vi.fn(),
}));

vi.mock('@/hooks/useUrlState', () => ({
  useUrlState: () => mockedUseUrlState,
}));
vi.mock('@/hooks/useDebouncedValue', () => ({
  useDebouncedValue: (value: string) => value,
}));
vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi', () => ({
  superadminMessagingApi: {
    fetchMessages: vi.fn(async () => ({ success: true, message: 'ok', data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 1 } })),
    fetchNotifications: vi.fn(async () => ({ success: true, message: 'ok', data: [] })),
    fetchTenants: vi.fn(async () => ({ success: true, message: 'ok', data: [] })),
    markNotificationRead: vi.fn(),
    markAllNotificationsRead: vi.fn(),
    sendMessage: vi.fn(),
  },
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => {
});

beforeEach(() => {
  resetSuperadminMessagingMockState();
});

describe('useSuperadminMessaging', () => {
  it('passes URL-backed search/filter parameters to the messages API', async () => {
    const { result } = renderHook(() => useSuperadminMessaging(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(vi.mocked(superadminMessagingApi.fetchMessages)).toHaveBeenCalledWith(expect.objectContaining({ search: 'iron', page: '1', limit: '10' }));
  });

  it('updates search atomically with page reset instead of two competing URL writes', () => {
    const { result } = renderHook(() => useSuperadminMessaging(), { wrapper });
    result.current.setSearch('fit');
    expect(mockedUseUrlState.setParams).toHaveBeenCalledWith({ search: 'fit', page: '1' });
  });
});
