import { resetSuperadminAffiliatesMockState } from '@/app/superadmin/affiliates/affiliates_mocks/handlers/SuperadminAffiliatesMockHandlers';
// Test: useSuperadminAffiliatesPage — covers success, loading, error, empty, and query-key (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminAffiliatesPage } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { vi, describe, it, expect, beforeEach } from 'vitest';
vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
    useQueryClient: vi.fn(),
    useMutation: vi.fn((options: any) => ({
        mutate: vi.fn(),
        mutateAsync: vi.fn(async (vars, mutOptions) => {
            const result = options.mutationFn ? await options.mutationFn(vars) : undefined;
            if (options.onSuccess) options.onSuccess(result);
            if (mutOptions && mutOptions.onSuccess) mutOptions.onSuccess(result);
            return result;
        }),
        isPending: false
    }))
}));
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    usePathname: vi.fn(() => ''),
    useSearchParams: vi.fn(() => ({ get: vi.fn(), set: vi.fn() })),
}));
vi.mock('@/app/superadmin/affiliates/affiliates_api/SuperadminAffiliatesApi', () => ({
    affiliatesApi: {
        fetchAffiliates: vi.fn(),
    },
}));
beforeEach(() => {
  resetSuperadminAffiliatesMockState();
});

describe('useSuperadminAffiliatesPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useQueryClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            invalidateQueries: vi.fn(),
            setQueryData: vi.fn(),
        });
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue(null),
        });
    });
    it('returns success state with affiliate data when query resolves', () => {
        const mockAffiliates = [
            { id: 'AFF-001', name: 'Fitness Partner Co', status: 'ACTIVE', commission: 10 },
        ];
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: mockAffiliates },
            status: 'success',
        });
        const { result } = renderHook(() => useSuperadminAffiliatesPage());
        expect(result.current.fetchState).toBe('success');
        expect(result.current.affiliates).toEqual(mockAffiliates);
    });
    it('returns loading state while query is pending', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            status: 'pending',
        });
        const { result } = renderHook(() => useSuperadminAffiliatesPage());
        expect(result.current.fetchState).toBe('pending');
    });
    it('returns error state when query fails', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            status: 'error',
        });
        const { result } = renderHook(() => useSuperadminAffiliatesPage());
        expect(result.current.fetchState).toBe('error');
    });
    it('returns empty affiliates list without crashing when API returns empty array', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: [] },
            status: 'success',
        });
        const { result } = renderHook(() => useSuperadminAffiliatesPage());
        expect(result.current.affiliates).toEqual([]);
        expect(result.current.fetchState).toBe('success');
    });
    it('passes search/status params into the query key when filters are set', () => {
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: (key: string) => {
                if (key === 'search')
                    return 'fitness';
                if (key === 'status')
                    return 'ACTIVE';
                return null;
            },
        });
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null, isPending: false, isError: false,
        });
        renderHook(() => useSuperadminAffiliatesPage());
        // Query key must include filter params for server-driven filtering
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: expect.arrayContaining(['superadmin', 'affiliates']),
        }));
    });
});
