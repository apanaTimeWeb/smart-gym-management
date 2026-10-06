"use client";
// RESPONSIBILITY: Owns RHF/Zod validation, dirty-state protection, selected-staff derivation, and successful-reset behavior for the Admin HR due-payment form.
// DATA FLOW: Staff query state → RHF form → Zod validation → HR due-payment mutation → TanStack Query refresh.
import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import { useAdminHrUnsavedChangesGuard } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUnsavedChangesGuard';
import { adminHrDueFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrDueFormSchema';
import type { AdminHrDueFormValues } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrDueFormTypes';
import { HR_DEFAULT_PAYMENT_MODE } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';

/**
 * @description Manages the Admin HR due-payment form from input through validated mutation handoff.
 * @dependencies Consumes feature-owned staff/server state and approved Admin unsaved-change infrastructure.
 * @edge-cases Preserves dirty values after validation/server failure and resets only after a confirmed successful mutation.
 */
export function useAdminHrDueForm() {
  const { staff, payDue, saving } = useAdminHrViewModel();
  const form = useForm<AdminHrDueFormValues>({
    resolver: zodResolver(adminHrDueFormSchema) as unknown as Resolver<AdminHrDueFormValues>,
    defaultValues: {
      staffId: '',
      amount: 0,
      notes: '',
      paymentMode: HR_DEFAULT_PAYMENT_MODE,
    },
  });
  const selectedStaffId = useWatch({ control: form.control, name: 'staffId' });
  const selectedStaff = useMemo(
    () => staff.find((member) => String(member.id) === String(selectedStaffId)),
    [selectedStaffId, staff],
  );
  const { confirmDiscardIfDirty } = useAdminHrUnsavedChangesGuard(form.formState.isDirty);

  const submit = form.handleSubmit(async (values) => {
    try {
      if (await payDue(values)) form.reset();
    } catch {
      // The mutation layer surfaces the backend error; form values intentionally remain dirty for retry.
    }
  });

  return {
    staff,
    selectedStaff,
    saving: saving || form.formState.isSubmitting,
    form,
    submit,
    confirmDiscardIfDirty,
  };
}
