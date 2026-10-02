'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminInvoicesManualPayment → consuming feature component.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi';
import { SUPERADMIN_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesQueryKeys';



/**
 * @description Owns the manual invoice-payment confirmation and mutation lifecycle for Superadmin Invoices.
 * @dependencies Uses the owning feature API, query-key registry, and approved confirmation/toast infrastructure.
 * @edge-case Reuses one idempotency key for retries of the same confirmed payment intent and clears it only after success.
 */
export function useSuperadminInvoicesManualPayment() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_invoices');
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: (data: { gymId: string; amount: number; planName: string; idempotencyKey: string }) => invoicesApi.createManualPayment({ gymId: data.gymId, amount: data.amount, planName: data.planName, currency: 'INR' }, data.idempotencyKey),
    onSuccess: async (response) => {
      if (!response.success || !response.data) throw new Error(response.message);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_INVOICES_QUERY_KEYS.all });
      idempotencyKeyRef.current = null;
      toast.success(response.message, { id: 'superadmin-invoices-manual-payment-success' });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message, { id: 'superadmin-invoices-manual-payment-error' });
    },
  });

  const handleLogManualPayment = async (gymId: string, amount: number, planName: string) => {
    const confirmed = await confirm({
      title: t('ui.record_manual_payment_title_repair'),
      message: t('ui.record_manual_payment_message_repair', { amount, planName }),
      type: 'warning',
      confirmText: t('ui.record_payment_action_repair'),
      cancelText: t('ui.cancel_action_repair'),
    });
    if (!confirmed) return false;
    idempotencyKeyRef.current ??= crypto.randomUUID();
    await mutation.mutateAsync({ gymId, amount, planName, idempotencyKey: idempotencyKeyRef.current });
    return true;
  };

  return { handleLogManualPayment, isLoggingPayment: mutation.isPending };
}
