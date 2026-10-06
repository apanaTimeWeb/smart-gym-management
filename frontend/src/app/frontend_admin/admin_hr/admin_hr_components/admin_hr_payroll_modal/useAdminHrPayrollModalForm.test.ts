import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminHrPayrollModalForm } from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_payroll_modal/useAdminHrPayrollModalForm';

const setShowPayrollModal = vi.fn();
const savePayroll = vi.fn();
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel', () => ({ useAdminHrViewModel: () => ({ showPayrollModal: true, setShowPayrollModal, savePayroll, saving: false, staff: [{ id: 's1', name: 'Riya', role: 'Trainer', salary: 25000 }] }) }));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUnsavedChangesGuard', () => ({ useAdminHrUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminHrPayrollModalForm', () => {
  it('exposes the selected staff source and closes the modal after discard confirmation', async () => {
    const { result } = renderHook(() => useAdminHrPayrollModalForm());
    expect(result.current.staff).toEqual([{ id: 's1', name: 'Riya', role: 'Trainer', salary: 25000 }]);
    await act(async () => result.current.handleClose());
    expect(setShowPayrollModal).toHaveBeenCalledWith(false);
  });
});
