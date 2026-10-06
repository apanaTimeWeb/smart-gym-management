import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminMembersBranchReference } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersBranchReference';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminMembersBranchReference', () => {
  it('uses the members-owned branch reference query', () => {
    const queryResult = { data: ['branch'], status: 'success' };
    vi.mocked(useQuery).mockReturnValue(queryResult as never);
    const { result } = renderHook(() => useAdminMembersBranchReference());
    expect(result.current).toBe(queryResult);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ queryKey: expect.any(Array), staleTime: 300000 }));
  });
});
