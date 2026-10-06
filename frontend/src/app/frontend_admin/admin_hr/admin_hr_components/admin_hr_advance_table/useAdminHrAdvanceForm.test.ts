import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminHrAdvanceForm } from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_advance_table/useAdminHrAdvanceForm';

const giveAdvance = vi.fn();

vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel', () => ({
  useAdminHrViewModel: () => ({ staff: [{ id: 'staff-1', name: 'Asha', role: 'Trainer', advanceSalary: 0 }], giveAdvance, saving: false }),
}));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUnsavedChangesGuard', () => ({
  useAdminHrUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }),
}));

describe('useAdminHrAdvanceForm', () => {
  it('submits validated values and resets only after success', async () => {
    giveAdvance.mockResolvedValueOnce(true);
    const { result } = renderHook(() => useAdminHrAdvanceForm());
    act(() => {
      result.current.form.setValue('staffId', 'staff-1', { shouldDirty: true });
      result.current.form.setValue('amount', 5000, { shouldDirty: true });
      result.current.form.setValue('paymentMode', 'UPI', { shouldDirty: true });
    });
    await act(async () => { await result.current.submit(); });
    expect(giveAdvance).toHaveBeenCalledWith({ staffId: 'staff-1', amount: 5000, notes: '', paymentMode: 'UPI' });
    expect(result.current.form.getValues('amount')).toBe(0);
  });

  it('preserves entered values when the mutation fails', async () => {
    giveAdvance.mockRejectedValueOnce(new Error('failed'));
    const { result } = renderHook(() => useAdminHrAdvanceForm());
    act(() => {
      result.current.form.setValue('staffId', 'staff-1', { shouldDirty: true });
      result.current.form.setValue('amount', 5000, { shouldDirty: true });
    });
    await act(async () => { await result.current.submit(); });
    expect(result.current.form.getValues('amount')).toBe(5000);
    expect(result.current.form.formState.isDirty).toBe(true);
  });
});
