import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminAttendanceDebounce } from '@/app/frontend_admin/admin_attendance/admin_attendance_hooks/useAdminAttendanceDebounce';

describe('useAdminAttendanceDebounce', () => {
  it('returns the latest value only after the debounce delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useAdminAttendanceDebounce(value, delay), { initialProps: { value: 'first', delay: 300 } });
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
