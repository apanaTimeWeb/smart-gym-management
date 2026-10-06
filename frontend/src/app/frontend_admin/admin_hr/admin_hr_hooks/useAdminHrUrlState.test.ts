import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminHrUrlState } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUrlState';

const router = { push: vi.fn() };
const params = new URLSearchParams('search=riya&page=3&role=Manager&branch=b2&month=2026-09');

vi.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => '/admin/hr',
  useSearchParams: () => params,
}));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrDebounce', () => ({
  useAdminHrDebounce: (value: string) => value,
}));

describe('useAdminHrUrlState', () => {
  it('hydrates the documented URL state and writes shareable changes back to the router', () => {
    const { result } = renderHook(() => useAdminHrUrlState());
    expect(result.current.search).toBe('riya');
    expect(result.current.currentPage).toBe(3);
    expect(result.current.roleFilter).toBe('Manager');
    expect(result.current.branchFilter).toBe('b2');
    expect(result.current.payrollMonth).toBe('2026-09');

    act(() => result.current.setRoleFilter('Trainer'));
    expect(router.push).toHaveBeenCalledWith('/admin/hr?search=riya&page=1&role=Trainer&branch=b2&month=2026-09');
  });

  it('resets pagination when staff sorting changes', () => {
    const { result } = renderHook(() => useAdminHrUrlState());
    act(() => result.current.setStaffSort('joinDate', 'desc'));
    expect(router.push).toHaveBeenCalledWith('/admin/hr?search=riya&page=1&role=Manager&branch=b2&month=2026-09&staffSortKey=joinDate&staffSortDir=desc');
  });
});
