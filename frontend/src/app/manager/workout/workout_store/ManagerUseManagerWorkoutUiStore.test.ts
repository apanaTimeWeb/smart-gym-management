import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as moduleUnderTest from '@/app/manager/workout/workout_store/ManagerUseManagerWorkoutUiStore';




describe('ManagerUseManagerWorkoutUiStore co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.ManagerUseManagerWorkoutUiStore).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.ManagerUseManagerWorkoutUiStore as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
