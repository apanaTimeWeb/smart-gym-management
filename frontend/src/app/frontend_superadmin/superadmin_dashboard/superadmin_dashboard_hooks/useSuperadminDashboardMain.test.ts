import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { superadminDashboardApi } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi';
import { SUPERADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardQueryKeys';
import { useSuperadminDashboardMain } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_hooks/useSuperadminDashboardMain';



let params = new URLSearchParams();
vi.mock('next/navigation', () => ({
    useSearchParams: vi.fn(() => params),
}));
vi.mock('@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi', () => ({
    superadminDashboardApi: { fetchDashboard: vi.fn() },
}));

function createWrapper() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

describe('useSuperadminDashboardMain', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        params = new URLSearchParams();
        vi.mocked(superadminDashboardApi.fetchDashboard).mockResolvedValue({
            success: true,
            message: 'Dashboard loaded',
            data: { metrics: {}, revenue: [], growth: [] },
        } as never);
    });

    it('loads the default dashboard range from the real query path', async () => {
        const { result } = renderHook(() => useSuperadminDashboardMain(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isPending).toBe(false));
        expect(result.current.timeRange).toBe('this_month');
        expect(superadminDashboardApi.fetchDashboard).toHaveBeenCalledWith({ range: 'this_month' });
    });

    it('preserves custom date parameters in the API request and query key', async () => {
        params = new URLSearchParams({ range: 'custom', startDate: '2024-01-01', endDate: '2024-01-31' });
        const { result } = renderHook(() => useSuperadminDashboardMain(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isPending).toBe(false));
        expect(superadminDashboardApi.fetchDashboard).toHaveBeenCalledWith({ range: 'custom', startDate: '2024-01-01', endDate: '2024-01-31' });
        expect(SUPERADMIN_DASHBOARD_QUERY_KEYS.byRange('custom', '2024-01-01', '2024-01-31')).toEqual([
            'superadmin_dashboard', 'range', 'custom', '2024-01-01', '2024-01-31',
        ]);
    });

    it('surfaces loading and error states from the actual Query lifecycle', async () => {
        let resolve!: (value: never) => void;
        vi.mocked(superadminDashboardApi.fetchDashboard).mockReturnValueOnce(new Promise<never>((res) => { resolve = res; }) as never);
        const { result } = renderHook(() => useSuperadminDashboardMain(), { wrapper: createWrapper() });
        expect(result.current.isPending).toBe(true);
        resolve({ success: true, message: 'ok', data: { metrics: {}, revenue: [], growth: [] } } as never);
        await waitFor(() => expect(result.current.isPending).toBe(false));

        vi.mocked(superadminDashboardApi.fetchDashboard).mockRejectedValueOnce(new Error('dashboard-api-failed'));
        const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const Wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children);
        params = new URLSearchParams({ range: 'custom', startDate: '2025-01-01', endDate: '2025-01-31' });
        const errorHook = renderHook(() => useSuperadminDashboardMain(), { wrapper: Wrapper });
        await waitFor(() => expect(errorHook.result.current.isError).toBe(true));
    });
});
