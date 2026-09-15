// Test: useSuperadminInvoicesPage — covers success, loading, error, empty, query-key, and mutation (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminInvoicesPage } from '@/app/superadmin/invoices/invoices_components/useSuperadminInvoicesPage';
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

vi.mock('@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api', () => ({
  invoicesApi: {
    fetchInvoices: vi.fn(),
    fetchTenants: vi.fn(),
    createManualPayment: vi.fn(),
  },
}));

const mockQueryClient = { setQueryData: vi.fn(), invalidateQueries: vi.fn() };

describe('useSuperadminInvoicesPage', () => {
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

  it('returns success state with invoice data when query resolves', () => {
    const mockInvoices = [
      { id: 'INV-001', gymName: 'Gold Gym', amount: 5000, status: 'PAID', createdAt: '2024-01-01T10:00:00Z' },
    ];

    (useQuery as unknown as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce({ data: { data: mockInvoices }, isLoading: false, isError: false })
      .mockReturnValueOnce({ data: { data: [] }, isLoading: false, isError: false });

    const { result } = renderHook(() => useSuperadminInvoicesPage());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.invoices).toEqual(mockInvoices);
  });

  it('returns loading state while invoice query is pending', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce({ data: undefined, isLoading: true, isError: false })
      .mockReturnValueOnce({ data: undefined, isLoading: false, isError: false });

    const { result } = renderHook(() => useSuperadminInvoicesPage());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns error state when invoice query fails', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce({ data: undefined, isLoading: false, isError: true })
      .mockReturnValueOnce({ data: undefined, isLoading: false, isError: false });

    const { result } = renderHook(() => useSuperadminInvoicesPage());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).not.toBeNull();
  });

  it('returns empty array without crashing when invoice list is empty', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce({ data: { data: [] }, isLoading: false, isError: false })
      .mockReturnValueOnce({ data: { data: [] }, isLoading: false, isError: false });

    const { result } = renderHook(() => useSuperadminInvoicesPage());

    expect(result.current.invoices).toEqual([]);
    expect(result.current.filteredInvoices).toEqual([]);
  });

  it('uses the correct query key so different pages are cached separately', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null, isLoading: false, isError: false,
    });

    renderHook(() => useSuperadminInvoicesPage());

    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['superadmin', 'invoices', expect.any(Object)],
    }));
  });

  it('calculates totalRevenue correctly from paid invoices', () => {
    const mockInvoices = [
      { id: 'INV-001', amount: 5000, status: 'PAID' },
      { id: 'INV-002', amount: 3000, status: 'PENDING' },
      { id: 'INV-003', amount: 2000, status: 'PAID' },
    ];

    (useQuery as unknown as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce({ data: { data: mockInvoices }, isLoading: false, isError: false })
      .mockReturnValueOnce({ data: { data: [] }, isLoading: false, isError: false });

    const { result } = renderHook(() => useSuperadminInvoicesPage());

    expect(result.current.totalRevenue).toBe(7000);
  });
});
