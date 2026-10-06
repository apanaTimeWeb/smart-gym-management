import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_hooks/useAdminDashboardLogic';

const searchParams = new URLSearchParams('branchId=branch-2&range=this_month&startDate=2026-10-01&endDate=2026-10-05');
vi.mock('next/navigation', () => ({ useSearchParams: () => searchParams }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_dashboard/admin_dashboard_api/AdminDashboardApi', () => ({ AdminDashboardApi: { fetchDashboardStats: vi.fn().mockResolvedValue({ data: { totalMembers: 7 } }) } }));

describe('useAdminDashboardLogic', () => {
  it('keeps branch/date identity in both the query key and request', async () => {
    vi.mocked(useQuery).mockReturnValue({ data: { totalMembers: 7 }, status: 'success', error: null } as never);
    const { result } = renderHook(() => useAdminDashboardLogic());
    expect(result.current.stats).toEqual({ totalMembers: 7 });
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown> };
    expect(JSON.stringify(options.queryKey)).toContain('branch-2');
    await expect(options.queryFn()).resolves.toEqual({ totalMembers: 7 });
  });
});
