import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsConstants';
import { useSuperadminTicketsStore } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_store/useSuperadminTicketsStore';



describe('useSuperadminTicketsStore', () => {
  it('resets pagination when search/filter state changes', () => {
    const { result } = renderHook(() => useSuperadminTicketsStore());
    expect(result.current.statusFilter).toBe(SUPERADMIN_TICKETS_ALL_FILTER);
    act(() => result.current.setCurrentPage(4));
    act(() => result.current.setSearch('billing'));
    expect(result.current.search).toBe('billing');
    expect(result.current.currentPage).toBe(1);
    act(() => result.current.setPriorityFilter('HIGH' as never));
    expect(result.current.priorityFilter).toBe('HIGH');
    expect(result.current.currentPage).toBe(1);
  });
});
