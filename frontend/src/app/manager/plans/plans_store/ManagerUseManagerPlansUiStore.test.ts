import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as moduleUnderTest from '@/app/manager/plans/plans_store/ManagerUseManagerPlansUiStore';



describe('ManagerUseManagerPlansUiStore co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.ManagerUseManagerPlansUiStore).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.ManagerUseManagerPlansUiStore as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
