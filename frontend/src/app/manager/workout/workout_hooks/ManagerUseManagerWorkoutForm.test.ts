import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as moduleUnderTest from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutForm';



describe('ManagerUseManagerWorkoutForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerWorkoutForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerWorkoutForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
