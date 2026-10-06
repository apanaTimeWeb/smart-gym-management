import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminHrDueAmountSync } from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_due_table/useAdminHrDueAmountSync';
import type { Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';

const staff: Staff = {
  id: 's1', name: 'Riya', email: 'r@example.com', phone: '9876543210', role: 'Trainer', salary: 25000,
  branch: 'b1', gender: 'FEMALE', joinDate: '2026-01-01', isActive: true, currentDue: 1800,
};

describe('useAdminHrDueAmountSync', () => {
  it('syncs the selected staff due into a clean amount field', () => {
    const setValue = vi.fn();
    const form = { getValues: vi.fn().mockReturnValue(0), formState: { dirtyFields: {} }, setValue } as never;
    renderHook(() => useAdminHrDueAmountSync(form, staff));
    expect(setValue).toHaveBeenCalledWith('amount', 1800, { shouldDirty: false });
  });

  it('does not overwrite a manually edited non-zero amount', () => {
    const setValue = vi.fn();
    const form = { getValues: vi.fn().mockReturnValue(900), formState: { dirtyFields: { amount: true } }, setValue } as never;
    renderHook(() => useAdminHrDueAmountSync(form, staff));
    expect(setValue).not.toHaveBeenCalled();
  });
});
