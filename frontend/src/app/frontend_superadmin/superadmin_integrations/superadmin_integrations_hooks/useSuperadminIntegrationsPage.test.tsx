// RESPONSIBILITY: Renders the useSuperadminIntegrationsPage.test UI for the integrations feature. Business/data orchestration is delegated to module-owned hooks.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchIntegrations } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_api/SuperadminIntegrationsApiCrudApi';
import { SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_mocks/superadmin_integrations_mocks_fixtures/SuperadminIntegrationsMockFixtures';
import { useSuperadminIntegrationsPage } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsPage';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_api/SuperadminIntegrationsApiCrudApi', () => ({ fetchIntegrations: vi.fn() }));
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
