"use client";
import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminHrPaymentFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrPaymentFormSchema';
import type { AdminHrPaymentFormValues } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPaymentFormTypes';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import { useAdminHrUnsavedChangesGuard } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUnsavedChangesGuard';

/**
 * @description Owns the Admin HR payroll-payment form lifecycle and exposes only the state/actions the modal view needs.
 * @dependencies React Hook Form/Zod, Admin HR view-model mutation state, locale translations, and the Admin unsaved-change guard.
 * @edge-case Resets when the selected payroll intent changes and preserves dirty state when the mutation fails.
 */
export function useAdminHrPaymentModalForm() {
  const locale = useLocale();
  const t = useTranslations();
  const { paymentModal, setPaymentModal, markPayrollPaid } = useAdminHrViewModel();
  const form = useForm<AdminHrPaymentFormValues>({
    resolver: zodResolver(adminHrPaymentFormSchema),
    defaultValues: { amount: 0 },
    mode: 'onChange',
  });
  useAdminHrUnsavedChangesGuard(form.formState.isDirty);

  useEffect(() => {
    form.reset({ amount: paymentModal?.pendingAmount ?? 0 });
  }, [form, paymentModal]);

  const submit = form.handleSubmit(async ({ amount }) => {
    if (!paymentModal) return false;
    const result = await markPayrollPaid(paymentModal.payrollId, amount);
    if (result !== false) {
      form.reset({ amount: 0 });
      setPaymentModal(null);
    }
    return result;
  });

  return { locale, t, paymentModal, setPaymentModal, form, amount: form.watch('amount'), submit };
}
