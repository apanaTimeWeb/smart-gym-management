import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminMembersDebounce } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersDebounce';

describe('useAdminMembersDebounce', () => {
  it('returns the latest value only after the debounce delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useAdminMembersDebounce(value, delay), { initialProps: { value: 'first', delay: 300 } });
    expect(result.current).toBe('first');
    rerender({ value: 'second', delay: 300 });
    expect(result.current).toBe('first');
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('first');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('second');
    vi.useRealTimers();
  });
});
