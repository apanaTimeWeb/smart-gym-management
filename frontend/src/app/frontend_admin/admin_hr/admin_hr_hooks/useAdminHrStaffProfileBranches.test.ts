import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminHrStaffProfileBranches } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrStaffProfileBranches';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminHrStaffProfileBranches', () => {
  it('passes the enabled state through to the branch query', () => {
    vi.mocked(useQuery).mockReturnValue({ data: [], status: 'success' } as never);
    renderHook(() => useAdminHrStaffProfileBranches(false));
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ enabled: false, staleTime: 600000 }));
  });
});
