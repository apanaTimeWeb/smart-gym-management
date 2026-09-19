'use client';
// RESPONSIBILITY: Owns payroll form setup, salary calculation, submission confirmation, and dirty-state protection.
// DATA FLOW: HR staff + attendance queries → RHF/Zod draft → confirmation → payroll mutation → Query cache/UI.
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { useManagerHrStaffAttendanceQuery } from '@/app/manager/hr/hr_api/ManagerUseManagerHrStaffAttendanceQuery';
import { managerHrPayrollFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrPayrollFormSchema';
import type { PayrollFormValues } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { EMPTY_PAYROLL_FORM } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { fromManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';

/** Coordinates payroll calculation and disbursement without business/form logic in the modal component. */
export function useManagerHrPayrollForm() {
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useManagerHrLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<PayrollFormValues>({ resolver: zodResolver(managerHrPayrollFormSchema), defaultValues: EMPTY_PAYROLL_FORM });
  const [calcData, setCalcData] = useState<{ base: number; attDed: number; advAdj: number; net: number } | null>(null);
  const selectedStaffId = form.watch('staffId');
  const selectedMonth = form.watch('month');
  const { data: attendanceResponse } = useManagerHrStaffAttendanceQuery(selectedStaffId || '', selectedMonth || '');

  useEffect(() => { if (showPayrollModal) { form.reset(EMPTY_PAYROLL_FORM); setCalcData(null); } }, [form, showPayrollModal]);
  useEffect(() => {
    const selectedStaff = staff.find((item) => String(item.id) === String(selectedStaffId));
    if (!selectedStaff) return;
    const baseSalary = selectedStaff.salary || 0;
    let attendanceDeduction = 0;
    if (selectedMonth && attendanceResponse?.data?.history) {
      const [yearText, monthText] = selectedMonth.split('-'); const year = Number(yearText); const month = Number(monthText); const daysInMonth = new Date(year, month, 0).getDate();
      const presentDays = attendanceResponse.data.history.filter((record) => record.date.startsWith(`${selectedMonth}-`) && record.status === 'PRESENT').length;
      attendanceDeduction = Math.round((baseSalary / daysInMonth) * (daysInMonth - presentDays));
    }
    const payableBeforeAdvance = Math.max(0, baseSalary - attendanceDeduction);
    const deductedAdvance = Math.min(payableBeforeAdvance, selectedStaff.advanceSalary || 0);
    const payableAmount = Math.max(0, payableBeforeAdvance - deductedAdvance);
    form.setValue('amount', fromManagerMinorUnits(payableAmount), { shouldValidate: true }); form.setValue('paidAmount', fromManagerMinorUnits(payableAmount), { shouldValidate: true });
    setCalcData({ base: baseSalary, attDed: attendanceDeduction, advAdj: deductedAdvance, net: payableAmount });
  }, [attendanceResponse, form, selectedMonth, selectedStaffId, staff]);

  const { confirmAndClose } = useManagerUnsavedChangesGuard(form.formState.isDirty && showPayrollModal);
  const handleClose = () => { void confirmAndClose(() => { form.reset(EMPTY_PAYROLL_FORM); setShowPayrollModal(false); }); };
  const submit = form.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: 'Confirm Payroll Disbursement', message: 'This will create a payroll record and may record a payment. Continue?', confirmText: 'Disburse Payroll', type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= createManagerIdempotencyKey();
    await savePayroll({ ...data, staffId: data.staffId, idempotencyKey: keyRef.current }); form.reset(data);
    keyRef.current = null;
  });
  return { showPayrollModal, staff, saving, form, calcData, submit, handleClose };
}
