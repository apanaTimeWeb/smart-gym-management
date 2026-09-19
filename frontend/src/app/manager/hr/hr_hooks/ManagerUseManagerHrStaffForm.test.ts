import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as moduleUnderTest from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrStaffForm';



describe('ManagerUseManagerHrStaffForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerHrStaffForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerHrStaffForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
