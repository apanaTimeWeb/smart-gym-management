import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';

const router = { replace: vi.fn() };
const searchParams = new URLSearchParams('page=3&status=active');
vi.mock('next/navigation', () => ({ useRouter: () => router, usePathname: () => '/admin/members', useSearchParams: () => searchParams }));

describe('useAdminLayoutUrlQuerySync', () => {
  beforeEach(() => router.replace.mockReset());

  it('hydrates explicit URL values and removes default values from generated URLs', () => {
    const setPage = vi.fn();
    const setStatus = vi.fn();
    renderHook(() => useAdminLayoutUrlQuerySync([
      { key: 'page', value: 1, defaultValue: 1, setValue: setPage },
      { key: 'status', value: 'all', defaultValue: 'all', setValue: setStatus },
    ]));
    expect(setPage).toHaveBeenCalledWith('3');
    expect(setStatus).toHaveBeenCalledWith('active');
    expect(router.replace).toHaveBeenCalledWith('/admin/members?page=1&status=all', { scroll: false });
  });
});
