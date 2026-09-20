import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';


const push = vi.fn();
const confirm = vi.fn();

vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));

describe('useManagerUnsavedChangesGuard', () => {
  beforeEach(() => {
    push.mockReset();
    confirm.mockReset();
    confirm.mockResolvedValue(true);
  });

  it('does not register dirty-state browser protection when clean', () => {
    const beforeUnload = vi.spyOn(window, 'addEventListener');
    renderHook(() => useManagerUnsavedChangesGuard(false));
    expect(beforeUnload).not.toHaveBeenCalledWith('beforeunload', expect.any(Function));
    beforeUnload.mockRestore();
  });

  it('uses the shared confirmation service for guarded navigation', async () => {
    const { result } = renderHook(() => useManagerUnsavedChangesGuard(true));
    await act(async () => {
      await result.current.confirmAndNavigate('/manager/dashboard');
    });
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ title: 'Unsaved Changes', confirmText: 'Discard', cancelText: 'Keep Editing' }));
    expect(push).toHaveBeenCalledWith('/manager/dashboard');
  });

  it('does not navigate when the shared confirmation is cancelled', async () => {
    confirm.mockResolvedValue(false);
    const { result } = renderHook(() => useManagerUnsavedChangesGuard(true));
    await act(async () => {
      await result.current.confirmAndNavigate('/manager/dashboard');
    });
    expect(push).not.toHaveBeenCalled();
  });
});
