import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as moduleUnderTest from '@/app/manager/members/members_components/ManagerMembersModal/ManagerUseManagerMembersModalForm';

const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider', () => ({
  useConfirm: vi.fn(() => ({ confirm: vi.fn().mockResolvedValue(true) })),
  ManagerConfirmProvider: ({ children }: { children: unknown }) => children,
}));


describe('ManagerUseManagerMembersModalForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerMembersModalForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerMembersModalForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook('' as never, false, '' as never, false));
    expect(result.current).toBeDefined();
  });
});
