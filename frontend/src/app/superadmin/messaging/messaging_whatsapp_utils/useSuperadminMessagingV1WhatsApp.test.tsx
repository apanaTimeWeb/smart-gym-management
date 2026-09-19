import { resetSuperadminMessagingMockState } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { fetchWhatsAppBulkCenter } from '@/app/superadmin/messaging/messaging_whatsapp_api/SuperadminMessagingWhatsappApi';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/fixtures/SuperadminMessagingV1WhatsAppMockFixtures';
import { useSuperadminMessagingV1WhatsApp } from '@/app/superadmin/messaging/messaging_whatsapp_utils/useSuperadminMessagingV1WhatsApp';
vi.mock('@/app/superadmin/messaging/messaging_whatsapp_api/SuperadminMessagingWhatsappApi', () => ({ fetchWhatsAppBulkCenter: vi.fn() }));
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
