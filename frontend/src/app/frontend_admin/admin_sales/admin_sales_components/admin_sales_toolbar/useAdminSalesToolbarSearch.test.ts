import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminSalesToolbarSearch } from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_toolbar/useAdminSalesToolbarSearch';

describe('useAdminSalesToolbarSearch', () => {
  afterEach(() => vi.useRealTimers());

  it('debounces local search changes before invoking the server-search setter', () => {
    vi.useFakeTimers();
    const setSearch = vi.fn();
    const { result } = renderHook(() => useAdminSalesToolbarSearch('', setSearch));
    act(() => result.current.setLocalSearch('riya'));
    expect(setSearch).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(299));
    expect(setSearch).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(setSearch).toHaveBeenCalledWith('riya');
  });
});
