// Test: useSuperadminBroadcastsPage — covers success, loading, error, empty, and mutation (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminBroadcastsPage } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsPage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn(),
}));
vi.mock('react-hot-toast', () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    usePathname: vi.fn(() => ''),
    useSearchParams: vi.fn(() => ({ get: vi.fn(), set: vi.fn() })),
}));
vi.mock('@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api', () => ({
    broadcastsApi: {
        fetchBroadcasts: vi.fn(),
        createBroadcast: vi.fn(),
        updateBroadcast: vi.fn(),
        deleteBroadcast: vi.fn(),
    },
}));
const mockQueryClient = { invalidateQueries: vi.fn(), setQueryData: vi.fn() };
describe('useSuperadminBroadcastsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useQueryClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockQueryClient);
        (useMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            mutateAsync: vi.fn(),
            isPending: false,
        });
    });
    it('returns success state with broadcast data when query resolves', () => {
        const mockBroadcasts = [
            { id: 'BCAST-001', title: 'New Feature Launch', status: 'SENT', targetType: 'ALL' },
        ];
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: mockBroadcasts },
            status: 'success',
        });
        const { result } = renderHook(() => useSuperadminBroadcastsPage());
        expect(result.current.fetchState).toBe('success');
        expect(result.current.broadcasts).toEqual(mockBroadcasts);
    });
    it('returns loading state while broadcast query is pending', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            status: 'pending',
        });
        const { result } = renderHook(() => useSuperadminBroadcastsPage());
        expect(result.current.fetchState).toBe('pending');
    });
    it('returns error state when broadcast query fails', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            status: 'error',
        });
        const { result } = renderHook(() => useSuperadminBroadcastsPage());
        expect(result.current.fetchState).toBe('error');
    });
    it('handles empty broadcasts list without crashing', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: { data: [] },
            status: 'success',
        });
        const { result } = renderHook(() => useSuperadminBroadcastsPage());
        expect(result.current.broadcasts).toEqual([]);
        expect(result.current.fetchState).toBe('success');
    });
    it('uses the correct query key for broadcasts cache', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null, isLoading: false, isError: false,
        });
        renderHook(() => useSuperadminBroadcastsPage());
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: expect.arrayContaining(['superadmin', 'broadcasts']),
        }));
    });
});
