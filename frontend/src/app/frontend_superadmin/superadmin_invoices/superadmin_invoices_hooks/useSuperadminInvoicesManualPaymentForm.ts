'use client';import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SuperadminInvoicesManualPaymentFormSchema } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesManualPaymentFormSchema';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { SuperadminInvoicesManualPaymentFormValues } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesManualPaymentFormSchema';



// DATA FLOW: Manual payment fields → React Hook Form/Zod → owning page mutation → query invalidation → updated invoice table.
// RESPONSIBILITY: Owns manual-payment form setup and submit contract; it does not call the API directly.
/**
 * @description Owns manual-payment form state, Zod validation, and submission-state handling for the invoice modal.
 * @dependencies React Hook Form, Zod resolver, and the parent feature mutation callback.
 * @edge-case Failed mutations do not reset the entered amount; the form resets only after the parent confirms the payment was recorded.
 */
export function useSuperadminInvoicesManualPaymentForm(onSave: (amount: number) => Promise<boolean>) {
  const form = useForm<SuperadminInvoicesManualPaymentFormValues>({
    resolver: zodResolver(SuperadminInvoicesManualPaymentFormSchema),
    defaultValues: { amount: undefined },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const recorded = await onSave(values.amount);
    if (recorded) form.reset();
  });

  return {
    register: form.register,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}
