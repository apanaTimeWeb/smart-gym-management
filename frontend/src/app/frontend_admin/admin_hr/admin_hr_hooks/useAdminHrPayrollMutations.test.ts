import { PAYROLL_STATUS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminHrPayrollMutations } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrPayrollMutations';
import type { Payroll, Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';

const confirm = vi.fn();
const mutationMocks = Array.from({ length: 5 }, () => ({ mutateAsync: vi.fn(), isPending: false }));
const queryClient = { invalidateQueries: vi.fn() };
const setShowPayrollModal = vi.fn();
const showToast = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useMutation: vi.fn(), useQueryClient: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({ useAdminLayoutConfirm: () => ({ confirm }) }));

const staff: Staff[] = [{
  id: 's1', name: 'Riya', email: 'r@example.com', phone: '9876543210', role: 'Trainer', salary: 25000,
  branch: 'b1', gender: 'FEMALE', joinDate: '2026-01-01', isActive: true,
}];
const payrolls: Payroll[] = [{ id: 'p1', staffId: 's1', month: '2026-10', amount: 25000, paidAmount: 5000, pendingAmount: 20000, status: PAYROLL_STATUS.PARTIAL, staff: { name: 'Riya', role: 'Trainer' } }];

describe('useAdminHrPayrollMutations', () => {
  beforeEach(() => {
    vi.mocked(useMutation).mockReset();
    mutationMocks.forEach((m) => { m.mutateAsync.mockReset().mockResolvedValue({ message: 'ok' }); });
    mutationMocks.forEach((m) => vi.mocked(useMutation).mockReturnValueOnce(m as never));
    vi.mocked(useQueryClient).mockReturnValue(queryClient as never);
    confirm.mockReset().mockResolvedValue(true);
    setShowPayrollModal.mockReset();
    showToast.mockReset();
  });

  it('calculates pending payroll amount and routes the payload through the mutation layer', async () => {
    const { result } = renderHook(() => useAdminHrPayrollMutations(staff, payrolls, setShowPayrollModal, showToast));
    await act(async () => {
      await result.current.savePayroll({ staffId: 's1', month: '2026-11', amount: '25000', paidAmount: 10000 });
    });
    expect(mutationMocks[0].mutateAsync).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ amount: 25000, paidAmount: 10000, pendingAmount: 15000, status: PAYROLL_STATUS.PARTIAL }) }));
    expect(showToast).toHaveBeenCalledWith('ok', 'success', 'hr-payroll-create-success');
    expect(setShowPayrollModal).toHaveBeenCalledWith(false);
  });

  it('calculates the remaining balance before marking an existing payroll paid', async () => {
    const { result } = renderHook(() => useAdminHrPayrollMutations(staff, payrolls, setShowPayrollModal, showToast));
    await act(async () => {
      await result.current.markPayrollPaid('p1', 5000);
    });
    expect(mutationMocks[1].mutateAsync).toHaveBeenCalledWith(expect.objectContaining({
      id: 'p1',
      payload: expect.objectContaining({ paidAmount: 10000, pendingAmount: 15000, status: PAYROLL_STATUS.PARTIAL }),
    }));
  });
});
