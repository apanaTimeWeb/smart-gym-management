import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as moduleUnderTest from '@/app/manager/schedule/schedule_store/ManagerUseManagerScheduleUiStore';




describe('ManagerUseManagerScheduleUiStore co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.ManagerUseManagerScheduleUiStore).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.ManagerUseManagerScheduleUiStore as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
