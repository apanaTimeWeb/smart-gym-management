import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as moduleUnderTest from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrAdvanceForm';
const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider', () => ({
  useConfirm: vi.fn(() => ({ confirm: vi.fn().mockResolvedValue(true) })),
  ManagerConfirmProvider: ({ children }: { children: unknown }) => children,
}));


describe('ManagerUseManagerHrAdvanceForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerHrAdvanceForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerHrAdvanceForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
