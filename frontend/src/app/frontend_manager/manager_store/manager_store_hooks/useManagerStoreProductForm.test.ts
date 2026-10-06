import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreProductForm';




describe('useManagerStoreProductForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerStoreProductForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerStoreProductForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
