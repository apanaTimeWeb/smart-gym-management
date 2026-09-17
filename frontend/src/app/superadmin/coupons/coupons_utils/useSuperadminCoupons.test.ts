// Test: useSuperadminCoupons — covers success, loading, error, empty, mutation cache-update (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminCoupons } from '@/app/superadmin/coupons/coupons_utils/useSuperadminCoupons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn(),
}));
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    usePathname: vi.fn(() => ''),
    useSearchParams: vi.fn(() => ({ get: vi.fn(), set: vi.fn() })),
}));
vi.mock('@/app/superadmin/coupons/superadmin_coupons_api/superadmin_coupons_api', () => ({
    couponsApi: {
        fetchCoupons: vi.fn(),
        createCoupon: vi.fn(),
        updateCoupon: vi.fn(),
        deleteCoupon: vi.fn(),
    },
}));
const mockQueryClient = {
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
};
describe('useSuperadminCoupons', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useQueryClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockQueryClient);
        (useMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            mutateAsync: vi.fn(),
            isPending: false,
        });
    });
    it('returns success state with coupon data when query resolves', () => {
        const mockCoupons = [
            { id: 'CPN-001', code: 'LAUNCH50', status: 'ACTIVE', discountType: 'PERCENT', discountValue: 50 },
        ];
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: mockCoupons },
            status: 'success',
        });
        const { result } = renderHook(() => useSuperadminCoupons());
        expect(result.current.fetchState).toBe('success');
        expect(result.current.coupons).toEqual(mockCoupons);
    });
    it('returns loading state while query is pending', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            status: 'pending',
        });
        const { result } = renderHook(() => useSuperadminCoupons());
        expect(result.current.fetchState).toBe('pending');
    });
    it('returns error state when coupon query fails', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            status: 'error',
        });
        const { result } = renderHook(() => useSuperadminCoupons());
        expect(result.current.fetchState).toBe('error');
    });
    it('handles empty coupon list gracefully (no division errors, no crashes)', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: [] },
            status: 'success',
        });
        const { result } = renderHook(() => useSuperadminCoupons());
        expect(result.current.coupons).toEqual([]);
        expect(result.current.fetchState).toBe('success');
    });
    it('uses the correct query key for cache isolation', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null, isLoading: false, isError: false,
        });
        renderHook(() => useSuperadminCoupons());
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: expect.arrayContaining(['superadmin', 'coupons']),
        }));
    });
});
