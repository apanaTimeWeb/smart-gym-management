// RESPONSIBILITY: Renders the useSuperadminMessagingV1WhatsApp.test UI for the messaging feature. Business/data orchestration is delegated to module-owned hooks.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resetSuperadminMessagingMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';
import { fetchWhatsAppBulkCenter } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_fixtures/SuperadminMessagingV1WhatsAppMockFixtures';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import { useSuperadminMessagingV1WhatsApp } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_hooks/useSuperadminMessagingV1WhatsApp';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi', () => ({ fetchWhatsAppBulkCenter: vi.fn() }));
const mockedFetch = vi.mocked(fetchWhatsAppBulkCenter);
beforeEach(() => {
  resetSuperadminMessagingV1WhatsAppMockState();
});

beforeEach(() => {
  resetSuperadminMessagingMockState();
});

describe('useSuperadminMessagingV1WhatsApp', () => {
    let queryClient: QueryClient;
    function TestQueryProvider({ children }: {
        children: ReactNode;
    }) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    beforeEach(() => {
        queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        mockedFetch.mockReset();
    });
    it('delivers bulk-center API data through TanStack Query', async () => {
        mockedFetch.mockResolvedValue({ success: true, message: 'Loaded', data: SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE });
        const { result } = renderHook(() => useSuperadminMessagingV1WhatsApp(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.data?.data).toEqual(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE));
        expect(mockedFetch).toHaveBeenCalledTimes(1);
    });
    it('surfaces API failures through query state', async () => {
        mockedFetch.mockRejectedValue(new Error('network failure'));
        const { result } = renderHook(() => useSuperadminMessagingV1WhatsApp(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeUndefined();
    });
});
