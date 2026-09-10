import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useManagerMembersMutations } from './useManagerMembersMutations';

// Mock dependencies
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
  useMutation: (opts: any) => ({
    mutateAsync: vi.fn(),
    mutate: vi.fn(),
  }),
}));

vi.mock('@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider', () => ({
  useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }),
}));

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
