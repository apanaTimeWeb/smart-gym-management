"use client";

// DATA FLOW: Payroll action → useAdminHrPayrollMutations → AdminHrApi → TanStack Query cache.
// RESPONSIBILITY: Owns Admin HR payroll/payment/advance mutation orchestration and critical confirmation boundaries.
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import type { Payroll, Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';

export function useAdminHrPayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setShowPayrollModal: (open: boolean) => void,
  showToast: (message: string, type: ToastType) => void,
) {
  const { confirm } = useAdminConfirm();
  const queryClient = useQueryClient();
  const createPayrollMutation = useMutation({ mutationFn: (payload: Partial<Payroll>) => hrApi.createPayroll(payload) });
  const updatePayrollMutation = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<Payroll> }) => hrApi.updatePayroll(id, payload) });
  const updateStaffMutation = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<Staff> }) => hrApi.updateStaff(id, payload) });
  const advanceMutation = useMutation({ mutationFn: hrApi.giveAdvance });
  const dueMutation = useMutation({ mutationFn: hrApi.payDue });

  const invalidateHr = useCallback(() => queryClient.invalidateQueries({ queryKey: ['admin', 'hr'] }), [queryClient]);

  const savePayroll = useCallback(async (data: Partial<Payroll> & { amount?: string | number; paidAmount?: string | number }) => {
    const staffMember = staff.find((member) => String(member.id) === String(data.staffId));
    const amount = Number(data.amount ?? 0);
    const paidAmount = Number(data.paidAmount ?? 0);
    const pendingAmount = Math.max(0, amount - paidAmount);
    const status = pendingAmount === 0 ? 'Paid' : 'PENDING';
    if (staffMember?.advanceSalary && staffMember.advanceSalary > 0) {
      const deduction = Math.min(staffMember.salary || 0, staffMember.advanceSalary);
      await updateStaffMutation.mutateAsync({ id: staffMember.id, payload: { advanceSalary: staffMember.advanceSalary - deduction } });
    }
    const response = await createPayrollMutation.mutateAsync({
      ...data, amount, paidAmount, pendingAmount, status,
      paidAt: paidAmount > 0 ? new Date().toISOString() : undefined,
      staff: staffMember ? { name: staffMember.name, role: staffMember.role } : undefined,
    });
    showToast(response.message, 'success');
    await invalidateHr();
    setShowPayrollModal(false);
  }, [createPayrollMutation, invalidateHr, setShowPayrollModal, showToast, staff, updateStaffMutation]);

  const markPayrollPaid = useCallback(async (id: string, amount: number) => {
    const payroll = payrolls.find((item) => String(item.id) === String(id));
    if (!payroll) return;
    const confirmed = await confirm({
      title: 'Record Salary Payment',
      message: `Record ${amount} as paid for ${payroll.staff?.name ?? payroll.staffId}?`,
      confirmText: 'Confirm Payment',
      type: 'warning',
    });
    if (!confirmed) return;
    const paidAmount = (payroll.paidAmount || 0) + amount;
    const pendingAmount = Math.max(0, payroll.amount - paidAmount);
    const response = await updatePayrollMutation.mutateAsync({ id, payload: { paidAmount, pendingAmount, status: pendingAmount === 0 ? 'Paid' : 'PENDING' } });
    showToast(response.message, 'success');
    await invalidateHr();
  }, [confirm, invalidateHr, payrolls, showToast, updatePayrollMutation]);

  const giveAdvance = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    const confirmed = await confirm({ title: 'Record Salary Advance', message: 'Record this salary advance?', confirmText: 'Confirm', type: 'warning' });
    if (!confirmed) return;
    const response = await advanceMutation.mutateAsync(data);
    showToast(response.message, 'success');
    await invalidateHr();
  }, [advanceMutation, confirm, invalidateHr, showToast]);

  const payDue = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    const confirmed = await confirm({ title: 'Pay Staff Due', message: 'Record this due payment?', confirmText: 'Confirm Payment', type: 'warning' });
    if (!confirmed) return;
    const response = await dueMutation.mutateAsync(data);
    showToast(response.message, 'success');
    await invalidateHr();
  }, [confirm, dueMutation, invalidateHr, showToast]);

  return {
    savePayroll,
    markPayrollPaid,
    giveAdvance,
    payDue,
    isPending: createPayrollMutation.isPending || updatePayrollMutation.isPending || updateStaffMutation.isPending || advanceMutation.isPending || dueMutation.isPending,
  };
}
