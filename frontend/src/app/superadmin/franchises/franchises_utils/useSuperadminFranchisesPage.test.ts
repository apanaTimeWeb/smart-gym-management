import { resetSuperadminFranchisesMockState } from '@/app/superadmin/franchises/franchises_mocks/handlers/SuperadminFranchisesMockHandlers';
// Test: useSuperadminFranchisesPage — covers success, loading, error, empty, and query-key (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminFranchisesPage } from '@/app/superadmin/franchises/franchises_utils/useSuperadminFranchisesPage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
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
vi.mock('@/app/superadmin/franchises/franchises_api/SuperadminFranchisesApi', () => ({
    franchisesApi: {
        fetchFranchises: vi.fn(),
        createFranchise: vi.fn(),
    },
}));
vi.mock('react-hot-toast', () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));
const mockQueryClient = { invalidateQueries: vi.fn() };
beforeEach(() => {
  resetSuperadminFranchisesMockState();
});

describe('useSuperadminFranchisesPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue(null),
        });
        (useQueryClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockQueryClient);
        (useMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            mutateAsync: vi.fn(),
            isPending: false,
        });
    });
    it('returns success state with franchise data when query resolves', () => {
        const mockFranchises = [
            { id: 'FRN-001', name: 'Iron Empire Franchise', status: 'ACTIVE', gymCount: 5 },
        ];
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: mockFranchises },
            isPending: false,
            isError: false,
        });
        const { result } = renderHook(() => useSuperadminFranchisesPage());
        expect(result.current.isPending).toBe(false);
        expect(result.current.franchises).toEqual(mockFranchises);
    });
    it('returns loading state while franchise query is pending', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            isPending: true,
            isError: false,
        });
        const { result } = renderHook(() => useSuperadminFranchisesPage());
        expect(result.current.isPending).toBe(true);
    });
    it('returns error state when franchise query fails', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            isPending: false,
            isError: true,
        });
        const { result } = renderHook(() => useSuperadminFranchisesPage());
        expect(result.current.isError).toBe(true);
    });
    it('handles empty franchise list gracefully', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: [] },
            isPending: false,
            isError: false,
        });
        const { result } = renderHook(() => useSuperadminFranchisesPage());
        expect(result.current.franchises).toEqual([]);
        expect(result.current.isPending).toBe(false);
    });
    it('uses the correct query key for franchise cache isolation', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null, isPending: false, isError: false,
        });
        renderHook(() => useSuperadminFranchisesPage());
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: expect.arrayContaining(['superadmin', 'franchises']),
        }));
    });
});
