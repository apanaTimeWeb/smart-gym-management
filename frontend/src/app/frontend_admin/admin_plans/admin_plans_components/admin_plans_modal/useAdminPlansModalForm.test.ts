import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAdminPlansModalForm } from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_modal/useAdminPlansModalForm';
import { useAdminPlansLogic } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansLogic';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_plans/admin_plans_store/useAdminPlansStore';
import { useAdminPlansUnsavedChangesGuard } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansUnsavedChangesGuard';

vi.mock('@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansLogic', () => ({ useAdminPlansLogic: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_plans/admin_plans_store/useAdminPlansStore', () => ({ useAdminPlansStore: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansUnsavedChangesGuard', () => ({ useAdminPlansUnsavedChangesGuard: vi.fn() }));

const savePlan = vi.fn();
const setShowModal = vi.fn();
const confirmDiscardIfDirty = vi.fn();

describe('useAdminPlansModalForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAdminPlansLogic).mockReturnValue({ savePlan, saving: false } as never);
    vi.mocked(useAdminPlansStore).mockReturnValue({
      showModal: true,
      setShowModal,
      editId: 'plan-1',
      form: { name: 'Gold', tier: 'PREMIUM', price1Month: '100', price3Month: '270', price6Month: '500', price12Month: '900', priceCustom: '1200', features: 'A' },
    } as never);
    vi.mocked(useAdminPlansUnsavedChangesGuard).mockReturnValue({ confirmDiscardIfDirty: () => confirmDiscardIfDirty() } as never);
    confirmDiscardIfDirty.mockResolvedValue(true);
  });

  it('initializes the form from the feature draft and closes only after the discard guard allows it', async () => {
    const { result } = renderHook(() => useAdminPlansModalForm());

    expect(result.current.showModal).toBe(true);
    expect(result.current.editId).toBe('plan-1');

    await act(async () => result.current.handleClose());
    expect(confirmDiscardIfDirty).toHaveBeenCalledTimes(1);
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
