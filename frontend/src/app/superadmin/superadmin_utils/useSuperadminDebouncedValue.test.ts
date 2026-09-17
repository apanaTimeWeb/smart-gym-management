import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_utils/useSuperadminDebouncedValue';

describe('useSuperadminDebouncedValue', () => {
  it('emits the latest value only after the debounce interval', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }: { value: string }) => useSuperadminDebouncedValue(value), {
      initialProps: { value: '' },
    });
    rerender({ value: 'a' });
    rerender({ value: 'ab' });
    expect(result.current).toBe('');
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('ab');
    vi.useRealTimers();
  });
});
