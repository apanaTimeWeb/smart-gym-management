import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SUPERADMIN_SEGMENTS_MOCK_FIXTURE } from '@/app/superadmin/segments/segments_mocks/fixtures/SuperadminSegmentsMockFixtures';
import { fetchSegmentsData } from '@/app/superadmin/segments/segments_api/superadmin_segments_api';
import { useSuperadminSegmentsPage } from '@/app/superadmin/segments/segments_utils/useSuperadminSegmentsPage';
import type { ReactNode } from 'react';
vi.mock('@/app/superadmin/segments/segments_api/superadmin_segments_api', () => ({ fetchSegmentsData: vi.fn() }));
const mockedFetch = vi.mocked(fetchSegmentsData);
describe('useSuperadminSegmentsPage integration', () => {
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
            data: SUPERADMIN_SEGMENTS_MOCK_FIXTURE,
        });
        const { result } = renderHook(() => useSuperadminSegmentsPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.data).toEqual(SUPERADMIN_SEGMENTS_MOCK_FIXTURE));
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(result.current.isError).toBe(false);
    });
    it('exposes request failures through the query state', async () => {
        mockedFetch.mockRejectedValue(new Error('network failure'));
        const { result } = renderHook(() => useSuperadminSegmentsPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });
});
