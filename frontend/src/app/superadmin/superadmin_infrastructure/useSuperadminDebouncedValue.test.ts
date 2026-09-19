import { act, renderHook } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_infrastructure/useSuperadminDebouncedValue';

describe('useSuperadminDebouncedValue', () => {
  it('updates only after the configured delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useSuperadminDebouncedValue(value, 300), { initialProps: { value: 'alpha' } });
    expect(result.current).toBe('alpha');
    rerender({ value: 'beta' });
    expect(result.current).toBe('alpha');
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('alpha');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('beta');
    vi.useRealTimers();
  });
});
