import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE } from '@/app/superadmin/integrations/integrations_mocks/fixtures/SuperadminIntegrationsMockFixtures';
import { fetchIntegrations } from '@/app/superadmin/integrations/integrations_api/SuperadminIntegrationsApi';
import { useSuperadminIntegrationsPage } from '@/app/superadmin/integrations/integrations_utils/useSuperadminIntegrationsPage';
import type { ReactNode } from 'react';
vi.mock('@/app/superadmin/integrations/integrations_api/SuperadminIntegrationsApi', () => ({ fetchIntegrations: vi.fn() }));
const mockedFetch = vi.mocked(fetchIntegrations);
describe('useSuperadminIntegrationsPage integration', () => {
    let queryClient: QueryClient;
    function TestQueryProvider({ children }: {
        children: ReactNode;
    }) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        });
        mockedFetch.mockReset();
    });
    it('delivers API response data through TanStack Query', async () => {
        mockedFetch.mockResolvedValue({
            success: true,
            message: 'Loaded successfully.',
            data: SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE,
        });
        const { result } = renderHook(() => useSuperadminIntegrationsPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.data).toEqual(SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE));
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(result.current.isError).toBe(false);
    });
    it('exposes request failures through the query state', async () => {
        mockedFetch.mockRejectedValue(new Error('network failure'));
        const { result } = renderHook(() => useSuperadminIntegrationsPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });
});
