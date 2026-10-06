import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminReportsBranchReference } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsBranchReference';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminReportsBranchReference', () => {
  it('uses the reports-owned branch reference query', () => {
    const queryResult = { data: ['branch'], status: 'success' };
    vi.mocked(useQuery).mockReturnValue(queryResult as never);
    const { result } = renderHook(() => useAdminReportsBranchReference());
    expect(result.current).toBe(queryResult);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ queryKey: expect.any(Array), staleTime: 300000 }));
  });
});
