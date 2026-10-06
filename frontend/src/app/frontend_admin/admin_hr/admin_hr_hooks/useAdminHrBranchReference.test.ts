import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminHrBranchReference } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrBranchReference';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminHrBranchReference', () => {
  it('uses the HR-owned branch-reference query and exposes the query result unchanged', () => {
    const queryResult = { data: ['b1'], status: 'success' };
    vi.mocked(useQuery).mockReturnValue(queryResult as never);
    const { result } = renderHook(() => useAdminHrBranchReference());
    expect(result.current).toBe(queryResult);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ queryKey: expect.any(Array), staleTime: 300000 }));
  });
});
