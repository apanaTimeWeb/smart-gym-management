// DATA FLOW: API / URL state / module client state → useSearchParams → superadmin_dashboard view components.
import { useSearchParams } from 'next/navigation';

import { SUPERADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_query_keys/SuperadminDashboardQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useSuperadminDashboardMain } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_hooks/useSuperadminDashboardMain';

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    usePathname: vi.fn(() => ''),
    useSearchParams: vi.fn(() => ({ get: vi.fn(), set: vi.fn() })),
}));
vi.mock('@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi', () => ({
    superadminDashboardApi: {
        fetchDashboard: vi.fn(),
    },
}));
describe('useSuperadminDashboardMain', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should initialize with default timeRange when no search params are present', () => {
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue(null),
        });
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null,
            isPending: false,
            isError: false,
        });
        const { result } = renderHook(() => useSuperadminDashboardMain());
        expect(result.current.timeRange).toBe('this_month');
        expect(result.current.isPending).toBe(false);
    });
    it('should parse custom date range correctly', () => {
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn((key: string) => {
                if (key === 'range')
                    return 'custom';
                if (key === 'startDate')
                    return '2024-01-01';
                if (key === 'endDate')
                    return '2024-01-31';
                return null;
            }),
        });
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: { metrics: {}, revenue: [], growth: [] } },
            isPending: false,
            isError: false,
        });
        const { result } = renderHook(() => useSuperadminDashboardMain());
        expect(result.current.timeRange).toBe('custom');
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: SUPERADMIN_DASHBOARD_QUERY_KEYS.byRange('custom', '2024-01-01', '2024-01-31'),
        }));
    });
    it('should return fetchState loading when query is loading', () => {
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue(null),
        });
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null,
            isPending: true,
            isError: false,
        });
        const { result } = renderHook(() => useSuperadminDashboardMain());
        expect(result.current.isPending).toBe(true);
    });
    it('should return fetchState error when query is in error', () => {
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue(null),
        });
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null,
            isPending: false,
            isError: true,
        });
        const { result } = renderHook(() => useSuperadminDashboardMain());
        expect(result.current.isError).toBe(true);
    });
});
