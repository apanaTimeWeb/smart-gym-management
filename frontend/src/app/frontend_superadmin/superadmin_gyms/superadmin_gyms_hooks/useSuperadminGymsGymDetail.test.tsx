import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchGymDetailBusinessOverview } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi';
import { useSuperadminGymsGymDetail } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDetail';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsGymDetailMockFixtures';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi', () => ({
    fetchGymDetailBusinessOverview: vi.fn(),
}));
const mockedFetch = vi.mocked(fetchGymDetailBusinessOverview);
beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('useSuperadminGymsGymDetail', () => {
    let queryClient: QueryClient;
    function TestQueryProvider({ children }: {
        children: ReactNode;
    }) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } },
        });
        mockedFetch.mockReset();
    });
    it('passes the route gym ID to the API and namespaces its query cache', async () => {
        mockedFetch.mockResolvedValue({
            success: true,
            message: 'Gym loaded.',
            data: SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t2,
        });
        const { result } = renderHook(() => useSuperadminGymsGymDetail('t2'), {
            wrapper: TestQueryProvider,
        });
        await waitFor(() => expect(result.current.data?.data?.gymId).toBe('t2'));
        expect(mockedFetch).toHaveBeenCalledWith('t2');
        expect(queryClient.getQueryData(['gym', 'detail-business-overview', 't2'])).toEqual({
            success: true,
            message: 'Gym loaded.',
            data: SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t2,
        });
    });
});
