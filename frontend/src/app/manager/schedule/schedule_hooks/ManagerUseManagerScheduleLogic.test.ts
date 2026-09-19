import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as moduleUnderTest from '@/app/manager/schedule/schedule_hooks/ManagerUseManagerScheduleLogic';
const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn(), back: vi.fn(), refresh: vi.fn() })),
  usePathname: vi.fn(() => '/manager'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));
vi.mock('@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider', () => ({
  useConfirm: vi.fn(() => ({ confirm: vi.fn().mockResolvedValue(true) })),
  ManagerConfirmProvider: ({ children }: { children: unknown }) => children,
}));


describe('ManagerUseManagerScheduleLogic co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerScheduleLogic).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerScheduleLogic as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
