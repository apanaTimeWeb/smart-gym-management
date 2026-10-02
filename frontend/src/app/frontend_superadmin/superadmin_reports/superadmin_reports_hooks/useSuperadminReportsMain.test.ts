import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminReportsMain } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsMain';



const setParam = vi.fn();
const requestExport = vi.fn().mockResolvedValue({ success: true, message: 'Export started' });
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => ({ tab: 'revenue', preset: 'THIS_MONTH' }[key] ?? fallback), setParam }) }));
vi.mock('@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsPage', () => ({ useSuperadminReportsPage: () => ({ revenue: { data: { data: [{ mrr: 110 }] }, isPending: false, isError: false, refetch: vi.fn() }, cancellations: { data: { data: [{ mrr: 10, daysActive: 30 }] }, isPending: false, isError: false, refetch: vi.fn() }, health: { data: { data: [{ score: 80 }] }, isPending: false, isError: false, refetch: vi.fn() } }) }));
vi.mock('@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsExportMutation', () => ({ useSuperadminReportsExportMutation: () => ({ requestExport, isRequesting: false }) }));

describe('useSuperadminReportsMain', () => {
  it('derives report metrics and keeps filters in URL state', async () => {
    const { result } = renderHook(() => useSuperadminReportsMain());
    expect(result.current.totalMRR).toBe(110);
    expect(result.current.totalCancelledRevenue).toBe(10);
    expect(result.current.avgHealthScore).toBe(80);
    act(() => result.current.setPlanFilter('PRO'));
    expect(setParam).toHaveBeenCalledWith('planFilter', 'PRO');
    await act(async () => { await result.current.handleExportCSV(); });
    expect(requestExport).toHaveBeenCalled();
  });
});
