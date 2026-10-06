"use client";

// RESPONSIBILITY: Owns Admin HR payroll/payment/advance mutation orchestration and critical confirmation boundaries.


import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrQueryKeys';
// DATA FLOW: Payroll action → useAdminHrPayrollMutations → AdminHrApi → TanStack Query cache.
import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminHrApi } from '@/app/frontend_admin/admin_hr/admin_hr_api/AdminHrApi';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { Payroll, Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
import type { AdminToastType } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastTypes';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { PAYROLL_STATUS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
/**
 * @description useAdminHrPayrollMutations: Owns Admin HR payroll/payment/advance mutation orchestration and critical confirmation boundaries.
 * @dependencies Consumes AdminHrQueryKeys, AdminHrApi, useAdminLayoutConfirm, AdminLayoutIdempotencyIntentStore, AdminHrTypes, AdminLayoutToastTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminHrPayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setShowPayrollModal: (open: boolean) => void,
  showToast: (message: string, type: AdminToastType, id?: string) => void,
) {
  const { confirm } = useAdminLayoutConfirm();
  const t = useTranslations();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const queryClient = useQueryClient();
  const invalidateHr = useCallback(() => queryClient.invalidateQueries({ queryKey: ADMIN_HR_QUERY_KEYS.key() }), [queryClient]);
  const createPayrollMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Payroll>; idempotencyKey: string }) => AdminHrApi.createPayroll(payload, idempotencyKey), onSuccess: () => { void invalidateHr(); } });
  const updatePayrollMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Payroll>; idempotencyKey: string }) => AdminHrApi.updatePayroll(id, payload, idempotencyKey), onSuccess: () => { void invalidateHr(); } });
  const updateStaffMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Staff>; idempotencyKey: string }) => AdminHrApi.updateStaff(id, payload, idempotencyKey), onSuccess: () => { void invalidateHr(); } });
  const advanceMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => AdminHrApi.giveAdvance(payload, idempotencyKey), onSuccess: () => { void invalidateHr(); }, onError: (error) => { const message = getAdminBackendMessage(error); if (message) showToast(message, 'error', 'hr-payroll-advance-error'); } });
  const dueMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => AdminHrApi.payDue(payload, idempotencyKey), onSuccess: () => { void invalidateHr(); }, onError: (error) => { const message = getAdminBackendMessage(error); if (message) showToast(message, 'error', 'hr-payroll-due-error'); } });

  const savePayroll = useCallback(async (data: Partial<Payroll> & { amount?: string | number; paidAmount?: string | number }) => {
    const staffMember = staff.find((member) => String(member.id) === String(data.staffId));
    const amount = Number(data.amount ?? 0);
    const paidAmount = Number(data.paidAmount ?? 0);
    const pendingAmount = Math.max(0, amount - paidAmount);
    const status = pendingAmount === 0 ? PAYROLL_STATUS.PAID : paidAmount > 0 ? PAYROLL_STATUS.PARTIAL : PAYROLL_STATUS.PENDING;
    const intentId = `create-payroll:${String(data.staffId)}:${String(data.month ?? '')}`;
    const confirmed = await confirm({ title: t('hr.AdminHrMutations.auto_disburseTitle'), message: t('hr.AdminHrMutations.auto_disburseMessage', { amount: String(amount), staffName: staffMember?.name ?? data.staffId }), confirmText: t('hr.AdminHrMutations.auto_disburseConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return false; }
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
    setShowPayrollModal(false);
  }, [clearIntentKey, confirm, createPayrollMutation, getIntentKey, setShowPayrollModal, showToast, staff, t, updateStaffMutation]);

  const markPayrollPaid = useCallback(async (id: string, amount: number) => {
    const payroll = payrolls.find((item) => String(item.id) === String(id));
    if (!payroll) return;
    const intentId = `payroll-payment:${id}`;
    const confirmed = await confirm({
      title: t('hr.AdminHrMutations.auto_paymentTitle'),
      message: t('hr.AdminHrMutations.auto_paymentMessage', { amount: String(amount), staffName: payroll.staff?.name ?? payroll.staffId }),
      confirmText: t('hr.AdminHrMutations.auto_paymentConfirm'),
      type: 'warning',
    });
    if (!confirmed) { clearIntentKey(intentId); return false; }
    const paidAmount = (payroll.paidAmount || 0) + amount;
    const pendingAmount = Math.max(0, payroll.amount - paidAmount);
    const response = await updatePayrollMutation.mutateAsync({ id, payload: { paidAmount, pendingAmount, status: pendingAmount === 0 ? PAYROLL_STATUS.PAID : paidAmount > 0 ? PAYROLL_STATUS.PARTIAL : PAYROLL_STATUS.PENDING }, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-payroll-payment-success');
  }, [clearIntentKey, confirm, getIntentKey, payrolls, showToast, updatePayrollMutation]);

  const giveAdvance = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    const intentId = `salary-advance:${data.staffId}:${data.amount}:${data.date ?? ''}`;
    const confirmed = await confirm({ title: t('hr.AdminHrMutations.auto_advanceTitle'), message: t('hr.AdminHrMutations.auto_advanceMessage'), confirmText: t('hr.AdminHrMutations.auto_advanceConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return false; }
    const response = await advanceMutation.mutateAsync({ payload: data, idempotencyKey: getIntentKey(intentId) });
    clearIntentKey(intentId);
    showToast(response.message, 'success', 'hr-payroll-advance-success');
    return true;
  }, [advanceMutation, clearIntentKey, confirm, getIntentKey, showToast, t]);

  const payDue = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    const intentId = `staff-due:${data.staffId}:${data.amount}:${data.date ?? ''}`;
    const confirmed = await confirm({ title: t('hr.AdminHrMutations.auto_dueTitle'), message: t('hr.AdminHrMutations.auto_dueMessage'), confirmText: t('hr.AdminHrMutations.auto_paymentConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return false; }
    const response = await dueMutation.mutateAsync({ payload: data, idempotencyKey: getIntentKey(intentId) });
    clearIntentKey(intentId);
    showToast(response.message, 'success', 'hr-payroll-due-success');
    return true;
  }, [clearIntentKey, confirm, dueMutation, getIntentKey, showToast, t]);

  return {
    savePayroll,
    markPayrollPaid,
    giveAdvance,
    payDue,
    isPending: createPayrollMutation.isPending || updatePayrollMutation.isPending || updateStaffMutation.isPending || advanceMutation.isPending || dueMutation.isPending,
  };
}
