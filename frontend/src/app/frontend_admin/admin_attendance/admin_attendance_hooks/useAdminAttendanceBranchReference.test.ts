import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminAttendanceBranchReference } from '@/app/frontend_admin/admin_attendance/admin_attendance_hooks/useAdminAttendanceBranchReference';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminAttendanceBranchReference', () => {
  it('uses the attendance-owned branch reference query', () => {
    const queryResult = { data: ['branch'], status: 'success' };
    vi.mocked(useQuery).mockReturnValue(queryResult as never);
    const { result } = renderHook(() => useAdminAttendanceBranchReference());
    expect(result.current).toBe(queryResult);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ queryKey: expect.any(Array), staleTime: 300000 }));
  });
});
