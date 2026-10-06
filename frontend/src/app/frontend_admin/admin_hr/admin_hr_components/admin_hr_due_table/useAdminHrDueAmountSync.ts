"use client";
import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
import type { AdminHrDueFormValues } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrDueFormTypes';

/**
 * @description Synchronizes the selected staff member's current due into the RHF amount field.
 * @dependencies React effect, React Hook Form, and module-owned Staff/StaffFormValues types.
 * @edge-case Never overwrites a dirty manually edited amount unless the field is still zero.
 */
export function useAdminHrDueAmountSync(form: UseFormReturn<AdminHrDueFormValues>, selectedStaff?: Staff) {
  useEffect(() => {
    if (!selectedStaff) return;
    const currentAmount = form.getValues('amount');
    if (!form.formState.dirtyFields.amount || currentAmount === 0) {
      form.setValue('amount', selectedStaff.currentDue || 0, { shouldDirty: false });
    }
  }, [form, selectedStaff]);
}
