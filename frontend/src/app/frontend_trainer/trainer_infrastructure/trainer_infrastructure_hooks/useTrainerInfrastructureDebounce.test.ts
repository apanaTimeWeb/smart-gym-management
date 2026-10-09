import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerInfrastructureDebounce } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureDebounce';





describe('useTrainerInfrastructureDebounce', () => {
  it('publishes the latest value only after the configured delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useTrainerInfrastructureDebounce(value, 300), { initialProps: { value: 'a' } });
    expect(result.current).toBe('a');

    rerender({ value: 'ab' });
    expect(result.current).toBe('a');
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('a');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('ab');

    vi.useRealTimers();
  });
});
