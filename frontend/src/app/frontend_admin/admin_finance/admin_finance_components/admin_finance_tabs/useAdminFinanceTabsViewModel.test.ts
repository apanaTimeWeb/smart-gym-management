import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminFinanceTabsViewModel } from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_tabs/useAdminFinanceTabsViewModel';

vi.useFakeTimers();

describe('useAdminFinanceTabsViewModel', () => {
  it('switches tabs immediately and propagates changed search after the debounce window', () => {
    const setSearch = vi.fn();
    const { result } = renderHook(() => useAdminFinanceTabsViewModel('', setSearch));

    act(() => {
      result.current.setTab('expenses');
      result.current.setLocalSearch('rent');
    });

    expect(result.current.tab).toBe('expenses');
    expect(result.current.localSearch).toBe('rent');
    act(() => vi.advanceTimersByTime(300));
    expect(setSearch).toHaveBeenCalledWith('rent');
  });
});
