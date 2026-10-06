'use client';
// DATA FLOW: Finance payment form → RHF/Zod → useManagerFinanceMutations → ManagerFinanceApi → authoritative response → query invalidation/UI close.

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerFinanceMutations } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceMutations';
import { managerFinancePaymentFormSchema } from '@/app/frontend_manager/manager_finance/manager_finance_schemas/ManagerFinancePaymentFormSchema';
import type { ManagerFinancePaymentFormOutput } from '@/app/frontend_manager/manager_finance/manager_finance_schemas/ManagerFinancePaymentFormSchema';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { useManagerFinanceUiStore } from '@/app/frontend_manager/manager_finance/manager_finance_store/useManagerFinanceUiStore';
import { useRef } from 'react';

/**
 * @description Coordinates the Finance payment form from RHF/Zod through the dedicated mutation hook.
 * @dependencies Finance form schema, mutation hook, UI store, idempotency and toast infrastructure.
 * @edge-case Reset and close happen only after authoritative mutation success; failed submissions preserve user input.
 */
export function useManagerFinancePaymentForm() {
  const ui = useManagerFinanceUiStore();
  const { createPayment } = useManagerFinanceMutations();
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<ManagerFinancePaymentFormOutput>({
    resolver: zodResolver(managerFinancePaymentFormSchema),
    defaultValues: { memberId: '', amount: 0, method: 'UPI', notes: '', paidAt: new Date().toISOString().slice(0, 10) },
    mode: 'onSubmit'
  });

  const close = () => {
    if (!createPayment.isPending) ui.setShowModal(false);
  };
  const submit = form.handleSubmit(async (values) => {
    const key = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
    idempotencyKeyRef.current = key;
    try {
      const response = await createPayment.mutateAsync({ payload: values, idempotencyKey: key });
      showManagerSuccessToast(response.message, 'manager-finance-payment-success');
      idempotencyKeyRef.current = null;
      form.reset({ memberId: '', amount: 0, method: 'UPI', notes: '', paidAt: new Date().toISOString().slice(0, 10) });
      ui.setShowModal(false);
    } catch (error: unknown) {
      showManagerErrorToast(error, 'manager-finance-payment-error');
    }
  });
  return { form, createPayment, close, submit };
}
