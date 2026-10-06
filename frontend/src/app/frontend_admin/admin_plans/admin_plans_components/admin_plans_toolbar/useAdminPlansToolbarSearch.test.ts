import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminPlansToolbarSearch } from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_toolbar/useAdminPlansToolbarSearch';

describe('useAdminPlansToolbarSearch', () => {
  afterEach(() => vi.useRealTimers());

  it('debounces local search changes and respects the 300ms boundary', () => {
    vi.useFakeTimers();
    const setSearch = vi.fn();
    const { result } = renderHook(() => useAdminPlansToolbarSearch('', setSearch));
    act(() => result.current.setLocalSearch('premium'));
    act(() => vi.advanceTimersByTime(299));
    expect(setSearch).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(setSearch).toHaveBeenCalledWith('premium');
  });
});
