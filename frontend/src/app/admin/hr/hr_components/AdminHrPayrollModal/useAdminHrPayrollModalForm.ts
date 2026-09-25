"use client";
// RESPONSIBILITY: Owns React Hook Form state, automatic payroll amount calculation, dirty-state protection, and modal lifecycle for AdminHrPayrollModal.
// DATA FLOW: Staff query → selected staff/month → form amount → Zod validation → HR payroll mutation → TanStack Query refresh.

import React, { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';
import { EMPTY_PAYROLL_FORM } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import type { PayrollFormValues } from '@/app/admin/hr/hr_types/AdminHrTypes';

const payrollFormSchema = z.object({
  staffId: z.string().min(1),
  month: z.string().min(1),
  amount: z.number().min(0),
  paidAmount: z.number().min(0),
  notes: z.string().optional(),
});

/** Owns payroll form state and derives the read-only amount from the selected staff record. */
export function useAdminHrPayrollModalForm() {
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useHrContext();
  const [calculationInfo, setCalculationInfo] = React.useState('');
  const form = useForm<PayrollFormValues>({    resolver: zodResolver(payrollFormSchema), defaultValues: EMPTY_PAYROLL_FORM });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useUnsavedChangesGuard(isDirty);
  const formValues = useWatch({ control });
  const selectedStaffId = formValues.staffId ?? EMPTY_PAYROLL_FORM.staffId;
  const selectedMonth = formValues.month ?? EMPTY_PAYROLL_FORM.month;

  // EFFECT: Resets the payroll draft and derived calculation when the modal is reopened.
  useEffect(() => {
    if (showPayrollModal) {
      reset(EMPTY_PAYROLL_FORM);
      setCalculationInfo('');
    }
  }, [reset, showPayrollModal]);

  // EFFECT: Keeps the payroll amount synchronized with the selected staff member's base salary.
  useEffect(() => {
    if (!selectedStaffId || !selectedMonth) return;
    const selectedStaff = staff.find((item) => String(item.id) === String(selectedStaffId));
    if (selectedStaff) {
      setValue('amount', selectedStaff.salary || 0, { shouldDirty: true });
      setCalculationInfo('');
    }
  }, [selectedMonth, selectedStaffId, setValue, staff]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) setShowPayrollModal(false);
  }, [confirmDiscardIfDirty, setShowPayrollModal]);

  return { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff, calculationInfo, register, handleSubmit, control, errors, handleClose };
}
