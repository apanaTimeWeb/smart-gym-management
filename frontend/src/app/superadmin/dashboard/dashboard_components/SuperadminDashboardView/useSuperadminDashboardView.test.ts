import { renderHook } from '@testing-library/react';
import { useSuperadminDashboardView } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/useSuperadminDashboardView';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { vi, describe, it, expect, beforeEach } from 'vitest';
vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    usePathname: vi.fn(() => ''),
    useSearchParams: vi.fn(() => ({ get: vi.fn(), set: vi.fn() })),
}));
vi.mock('@/app/superadmin/dashboard/dashboard_api/SuperadminDashboardApi', () => ({
    superadminDashboardApi: {
        fetchDashboard: vi.fn(),
    },
}));
describe('useSuperadminDashboardView', () => {
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
        const { result } = renderHook(() => useSuperadminDashboardView());
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
        const { result } = renderHook(() => useSuperadminDashboardView());
        expect(result.current.timeRange).toBe('custom');
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: ['superadmin', 'dashboard', 'custom', '2024-01-01', '2024-01-31'],
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
        const { result } = renderHook(() => useSuperadminDashboardView());
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
        const { result } = renderHook(() => useSuperadminDashboardView());
        expect(result.current.isError).toBe(true);
    });
});
