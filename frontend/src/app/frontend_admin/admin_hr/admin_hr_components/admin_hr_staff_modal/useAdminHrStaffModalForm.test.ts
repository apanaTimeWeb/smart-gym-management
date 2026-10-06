import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminHrStaffModalForm } from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_staff_modal/useAdminHrStaffModalForm';

const setShowModal = vi.fn();
const saveStaff = vi.fn();
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel', () => ({ useAdminHrViewModel: () => ({ showModal: true, setShowModal, editId: null, editData: null, saveStaff, saving: false }) }));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrBranchReference', () => ({ useAdminHrBranchReference: () => ({ data: [{ id: 'b1', name: 'Main Branch' }] }) }));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUnsavedChangesGuard', () => ({ useAdminHrUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminHrStaffModalForm', () => {
  it('resolves branch labels and toggles password visibility through real form state', () => {
    const { result } = renderHook(() => useAdminHrStaffModalForm());
    expect(result.current.getBranchLabel('b1')).toBe('Main Branch');
    expect(result.current.getBranchLabel('missing')).toBe('missing');
    expect(result.current.showPassword).toBe(false);
    act(() => result.current.togglePasswordVisibility());
    expect(result.current.showPassword).toBe(true);
  });
});
