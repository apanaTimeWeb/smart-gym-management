"use client";

// DATA FLOW: Payroll action → useAdminHrPayrollMutations → AdminHrApi → TanStack Query cache.
// RESPONSIBILITY: Owns Admin HR payroll/payment/advance mutation orchestration and critical confirmation boundaries.
import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminIdempotencyIntentStore';
import type { Payroll, Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { AdminToastType } from '@/app/admin/admin_layout/AdminFeedback/AdminToastTypes';

/** Coordinates HrPayrollMutations state, data flow, and feature behavior. */
export function useAdminHrPayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setShowPayrollModal: (open: boolean) => void,
  showToast: (message: string, type: AdminToastType, id?: string) => void,
) {
  const { confirm } = useAdminConfirm();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const queryClient = useQueryClient();
  const createPayrollMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Payroll>; idempotencyKey: string }) => hrApi.createPayroll(payload, idempotencyKey) });
  const updatePayrollMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Payroll>; idempotencyKey: string }) => hrApi.updatePayroll(id, payload, idempotencyKey) });
  const updateStaffMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Staff>; idempotencyKey: string }) => hrApi.updateStaff(id, payload, idempotencyKey) });
  const advanceMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => hrApi.giveAdvance(payload, idempotencyKey) });
  const dueMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => hrApi.payDue(payload, idempotencyKey) });

  const invalidateHr = useCallback(() => queryClient.invalidateQueries({ queryKey: ['admin', 'hr'] }), [queryClient]);

  const savePayroll = useCallback(async (data: Partial<Payroll> & { amount?: string | number; paidAmount?: string | number }) => {
    const staffMember = staff.find((member) => String(member.id) === String(data.staffId));
    const amount = Number(data.amount ?? 0);
    const paidAmount = Number(data.paidAmount ?? 0);
    const pendingAmount = Math.max(0, amount - paidAmount);
    const status = pendingAmount === 0 ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'PENDING';
    const intentId = `create-payroll:${String(data.staffId)}:${String(data.month ?? '')}`;
    const confirmed = await confirm({ title: 'Disburse Payroll', message: `Disburse payroll of ${amount} for ${staffMember?.name ?? data.staffId}?`, confirmText: 'Disburse Payroll', type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return; }
    if (staffMember?.advanceSalary && staffMember.advanceSalary > 0) {
      const deduction = Math.min(staffMember.salary || 0, staffMember.advanceSalary);
      const deductionIntentId = `payroll-advance-deduction:${staffMember.id}:${String(data.month ?? '')}`;
      await updateStaffMutation.mutateAsync({ id: staffMember.id, payload: { advanceSalary: staffMember.advanceSalary - deduction }, idempotencyKey: getIntentKey(deductionIntentId) });
    }
    const response = await createPayrollMutation.mutateAsync({
      payload: { ...data, amount, paidAmount, pendingAmount, status, paidAt: paidAmount > 0 ? new Date().toISOString() : undefined, staff: staffMember ? { name: staffMember.name, role: staffMember.role } : undefined },
      idempotencyKey: getIntentKey(intentId),
    });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-payroll-create-success');
    await invalidateHr();
    setShowPayrollModal(false);
  }, [clearIntentKey, confirm, createPayrollMutation, getIntentKey, invalidateHr, setShowPayrollModal, showToast, staff, updateStaffMutation]);

  const markPayrollPaid = useCallback(async (id: string, amount: number) => {
    const payroll = payrolls.find((item) => String(item.id) === String(id));
    if (!payroll) return;
    const intentId = `payroll-payment:${id}`;
    const confirmed = await confirm({
      title: 'Record Salary Payment',
      message: `Record ${amount} as paid for ${payroll.staff?.name ?? payroll.staffId}?`,
      confirmText: 'Confirm Payment',
      type: 'warning',
    });
    if (!confirmed) { clearIntentKey(intentId); return; }
    const paidAmount = (payroll.paidAmount || 0) + amount;
    const pendingAmount = Math.max(0, payroll.amount - paidAmount);
    const response = await updatePayrollMutation.mutateAsync({ id, payload: { paidAmount, pendingAmount, status: pendingAmount === 0 ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'PENDING' }, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-payroll-payment-success');
    await invalidateHr();
  }, [clearIntentKey, confirm, getIntentKey, invalidateHr, payrolls, showToast, updatePayrollMutation]);

  const giveAdvance = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    const intentId = `salary-advance:${data.staffId}:${data.amount}:${data.date ?? ''}`;
    const confirmed = await confirm({ title: 'Record Salary Advance', message: 'Record this salary advance?', confirmText: 'Confirm', type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return; }
    const response = await advanceMutation.mutateAsync({ payload: data, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-payroll-advance-success');
    await invalidateHr();
  }, [advanceMutation, clearIntentKey, confirm, getIntentKey, invalidateHr, showToast]);

  const payDue = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    const intentId = `staff-due:${data.staffId}:${data.amount}:${data.date ?? ''}`;
    const confirmed = await confirm({ title: 'Pay Staff Due', message: 'Record this due payment?', confirmText: 'Confirm Payment', type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return; }
    const response = await dueMutation.mutateAsync({ payload: data, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-payroll-due-success');
    await invalidateHr();
  }, [clearIntentKey, confirm, dueMutation, getIntentKey, invalidateHr, showToast]);

  return {
    savePayroll,
    markPayrollPaid,
    giveAdvance,
    payDue,
    isPending: createPayrollMutation.isPending || updatePayrollMutation.isPending || updateStaffMutation.isPending || advanceMutation.isPending || dueMutation.isPending,
  };
}
