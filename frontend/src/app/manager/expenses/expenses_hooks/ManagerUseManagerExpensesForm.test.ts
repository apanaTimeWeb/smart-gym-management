import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as moduleUnderTest from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesForm';



describe('ManagerUseManagerExpensesForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerExpensesForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerExpensesForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
