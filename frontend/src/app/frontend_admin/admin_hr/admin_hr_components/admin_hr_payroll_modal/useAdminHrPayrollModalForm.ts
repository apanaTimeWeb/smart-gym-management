"use client";
// RESPONSIBILITY: Owns React Hook Form state, automatic payroll amount calculation, dirty-state protection, and modal lifecycle for AdminHrPayrollModal.
// DATA FLOW: Staff query → selected staff/month → form amount → Zod validation → HR payroll mutation → TanStack Query refresh.

import React, { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import { useAdminHrUnsavedChangesGuard } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUnsavedChangesGuard';
import { EMPTY_PAYROLL_FORM } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
import type { PayrollFormValues } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';

/**
 * @description Manages useAdminHrPayrollModalForm for the Admin admin_hr feature, keeping feature-specific orchestration isolated from presentation.
 * @dependencies Uses only documented module API/state dependencies and approved application infrastructure.
 * @edge-case Preserves loading, empty, error, retry, and cancellation behavior defined by the feature contract.
 */
const payrollFormSchema = z.object({
  staffId: z.string().min(1, '__i18n:hr.validation.staffRequired'),
  month: z.string().min(1, '__i18n:hr.validation.staffRequired'),
  amount: z.number().min(0, '__i18n:hr.validation.amountNonNegative'),
  paidAmount: z.number().min(0, '__i18n:hr.validation.paidAmountNonNegative'),
  notes: z.string().optional(),
});

/** Owns payroll form state and derives the read-only amount from the selected staff record. */
export function useAdminHrPayrollModalForm() {
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useAdminHrViewModel();
  const [calculationInfo, setCalculationInfo] = React.useState('');
  const form = useForm<PayrollFormValues>({    resolver: zodResolver(payrollFormSchema), defaultValues: EMPTY_PAYROLL_FORM });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useAdminHrUnsavedChangesGuard(isDirty);
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
