import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminReportsLogic } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsLogic';

const exportReport = vi.fn();
const store = { activeTab: 'revenue', selectedGymId: 'b1' };
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('range=this_month&startDate=2026-10-01&endDate=2026-10-05') }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_reports/admin_reports_store/useAdminReportsStore', () => ({ useAdminReportsStore: () => store }));
vi.mock('@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsMutations', () => ({ useAdminReportsMutations: () => ({ exportMutation: { status: 'idle' }, exportReport }) }));

describe('useAdminReportsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReturnValue({ data: { data: { kpis: { totalRevenue: 100 } } }, status: 'success' } as never);
    exportReport.mockReset();
  });

  it('uses the selected branch/date scope and routes exports through the mutation contract', async () => {
    const { result } = renderHook(() => useAdminReportsLogic());
    expect(result.current.reportData).toEqual({ kpis: { totalRevenue: 100 } });
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown> };
    expect(JSON.stringify(options.queryKey)).toContain('b1');
    await result.current.handleExport('csv');
    expect(exportReport).toHaveBeenCalledWith({ type: 'revenue', format: 'csv', from: '2026-10-01', to: '2026-10-05', branchId: 'b1' });
  });
});
