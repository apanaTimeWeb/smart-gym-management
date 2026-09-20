import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useManagerMembersMutations } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersMutations';


// Mock dependencies
const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
  useMutation: (opts: unknown) => ({
    mutateAsync: vi.fn(),
    mutate: vi.fn() }) }));

vi.mock('@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider', () => ({
  useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));

describe('useManagerMembersMutations', () => {
  it('should return mutation functions', () => {
    const showToast = vi.fn();
    const setSelectedMember = vi.fn();
    const setShowAddModal = vi.fn();
    const setShowRenewModal = vi.fn();
    const setShowPaymentModal = vi.fn();

    const { result } = renderHook(() => useManagerMembersMutations(
      showToast, null, setSelectedMember, null, setShowAddModal, setShowRenewModal, setShowPaymentModal
    ));

    expect(typeof result.current.saveMember).toBe('function');
    expect(typeof result.current.deleteMember).toBe('function');
    expect(typeof result.current.renewMember).toBe('function');
    expect(typeof result.current.recordPayment).toBe('function');
  });
});
