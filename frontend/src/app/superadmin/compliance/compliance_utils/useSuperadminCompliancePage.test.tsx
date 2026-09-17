import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SUPERADMIN_COMPLIANCE_MOCK_FIXTURE } from '@/app/superadmin/compliance/compliance_mocks/fixtures/SuperadminComplianceMockFixtures';
import { fetchComplianceData } from '@/app/superadmin/compliance/compliance_api/superadmin_compliance_api';
import { useSuperadminCompliancePage } from '@/app/superadmin/compliance/compliance_utils/useSuperadminCompliancePage';
import type { ReactNode } from 'react';
vi.mock('@/app/superadmin/compliance/compliance_api/superadmin_compliance_api', () => ({ fetchComplianceData: vi.fn() }));
const mockedFetch = vi.mocked(fetchComplianceData);
describe('useSuperadminCompliancePage integration', () => {
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
            data: SUPERADMIN_COMPLIANCE_MOCK_FIXTURE,
        });
        const { result } = renderHook(() => useSuperadminCompliancePage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.data).toEqual(SUPERADMIN_COMPLIANCE_MOCK_FIXTURE));
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(result.current.isError).toBe(false);
    });
    it('exposes request failures through the query state', async () => {
        mockedFetch.mockRejectedValue(new Error('network failure'));
        const { result } = renderHook(() => useSuperadminCompliancePage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });
});
