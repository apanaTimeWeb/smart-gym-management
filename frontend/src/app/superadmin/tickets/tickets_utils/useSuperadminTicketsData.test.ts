// Test: useSuperadminTicketsData — covers success, loading, error, empty, and query-key (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminTicketsData } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTicketsData';
import { useQuery } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('@/lib/api', () => ({
  apiFetch: vi.fn(),
}));

type MockTicket = { id: string; subject: string; status: string };

describe('useSuperadminTicketsData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns success state with typed data when query resolves', () => {
    const mockTickets: MockTicket[] = [
      { id: 'TKT-001', subject: 'Login issue', status: 'OPEN' },
    ];

    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockTickets,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSuperadminTicketsData<MockTicket[]>('/superadmin/tickets'));

    expect(result.current.fetchState).toBe('success');
    expect(result.current.data).toEqual(mockTickets);
    expect(result.current.error).toBeNull();
  });

  it('returns loading state while query is pending', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSuperadminTicketsData<MockTicket[]>('/superadmin/tickets'));

    expect(result.current.fetchState).toBe('loading');
    expect(result.current.data).toBeNull();
  });

  it('returns error state when query fails and exposes message', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Unauthorized'),
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSuperadminTicketsData<MockTicket[]>('/superadmin/tickets'));

    expect(result.current.fetchState).toBe('error');
    expect(result.current.error).toBe('Unauthorized');
  });

  it('returns null data without crashing when response is empty', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSuperadminTicketsData<MockTicket[]>('/superadmin/tickets'));

    expect(result.current.fetchState).toBe('success');
    expect(result.current.data).toBeNull();
  });

  it('includes the endpoint in the query key for cache isolation', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null, isLoading: false, isError: false, error: null, refetch: vi.fn(),
    });

    const endpoint = '/superadmin/tickets';
    renderHook(() => useSuperadminTicketsData<MockTicket[]>(endpoint));

    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['superadmin', endpoint],
    }));
  });
});
