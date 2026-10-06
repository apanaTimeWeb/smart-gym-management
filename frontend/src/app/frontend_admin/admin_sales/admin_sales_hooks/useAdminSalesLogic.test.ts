import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';

const router = { push: vi.fn() };
const queryClient = { invalidateQueries: vi.fn() };
const searchParams = new URLSearchParams('branchId=b1&tab=overview&range=this_month&search=riya&page=2');
const queries = [
  { data: { data: { monthlyRevenue: [{ month: 'Oct', revenue: 100 }] } }, status: 'success', error: null },
  { data: { data: [{ source: 'referral', count: 3 }] }, status: 'success', error: null },
  { data: { data: { report: [{ name: 'Riya' }], totals: { activeCount: 1, revenue: 100 } } }, status: 'success', error: null },
  { data: { data: { members: [{ id: 'm1' }], total: 1 } }, status: 'success', error: null },
  { data: { data: { members: [{ id: 'm2' }], total: 1 } }, status: 'success', error: null },
  { data: { data: { orders: [{ id: 'o1' }], total: 1 } }, status: 'success', error: null },
  { data: { data: { summary: { revenue: 120 } } }, status: 'success', error: null },
];
vi.mock('next/navigation', () => ({ useRouter: () => router, useSearchParams: () => searchParams, usePathname: () => '/admin/sales' }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn(), useQueryClient: () => queryClient }));
vi.mock('@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesDebounce', () => ({ useAdminSalesDebounce: (value: string) => value }));

describe('useAdminSalesLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    queries.forEach((q) => vi.mocked(useQuery).mockReturnValueOnce(q as never));
    router.push.mockReset();
  });

  it('maps all server-backed sales sections and keeps branch identity in requests', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.overviewData).toEqual([{ month: 'Oct', revenue: 100 }]);
    expect(result.current.pendingPayments).toEqual([{ id: 'm1' }]);
    expect(result.current.storeOrders).toEqual([{ id: 'o1' }]);
    const firstQuery = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[] };
    expect(JSON.stringify(firstQuery.queryKey)).toContain('b1');
  });

  it('writes search updates back to the shareable route', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    act(() => result.current.setSearch('aman'));
    expect(router.push).toHaveBeenCalled();
    expect(String(router.push.mock.calls[0]?.[0])).toContain('search=aman');
  });
});
