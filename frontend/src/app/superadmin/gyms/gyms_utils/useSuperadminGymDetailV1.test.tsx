import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymDetailV1MockFixtures';
import { fetchGymDetailBusinessOverview } from '@/app/superadmin/gyms/gyms_api/superadmin_gym_detail_business_overview_api';
import { useSuperadminGymDetailV1 } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetailV1';
import type { ReactNode } from 'react';
vi.mock('@/app/superadmin/gyms/gyms_api/superadmin_gym_detail_business_overview_api', () => ({
    fetchGymDetailBusinessOverview: vi.fn(),
}));
const mockedFetch = vi.mocked(fetchGymDetailBusinessOverview);
describe('useSuperadminGymDetailV1', () => {
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
        const { result } = renderHook(() => useSuperadminGymDetailV1('t2'), {
            wrapper: TestQueryProvider,
        });
        await waitFor(() => expect(result.current.data?.data?.gymId).toBe('t2'));
        expect(mockedFetch).toHaveBeenCalledWith('t2');
        expect(queryClient.getQueryData(['superadmin', 'gym', 'detail-business-overview', 't2'])).toEqual({
            success: true,
            message: 'Gym loaded.',
            data: SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t2,
        });
    });
});
