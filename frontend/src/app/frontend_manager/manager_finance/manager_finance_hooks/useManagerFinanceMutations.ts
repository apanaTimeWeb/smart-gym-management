'use client';
// DATA FLOW: Payment form payload → useManagerFinanceMutations → ManagerFinanceApi → authoritative response → ManagerFinanceQueryKeys invalidation.

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerFinanceApi } from '@/app/frontend_manager/manager_finance/manager_finance_api/ManagerFinanceApi';
import { ManagerFinanceQueryKeys } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceQueryKeys';
import type { ManagerFinancePaymentFormOutput } from '@/app/frontend_manager/manager_finance/manager_finance_schemas/ManagerFinancePaymentFormSchema';

/**
 * @description Owns finance write operations and invalidates payment/summary server state after authoritative API success.
 * @dependencies ManagerFinanceApi and ManagerFinanceQueryKeys only.
 * @edge-case Idempotency keys are supplied by the caller per user intent; failed mutations leave query state untouched.
 */
export function useManagerFinanceMutations() {
  const queryClient = useQueryClient();
  const createPayment = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: ManagerFinancePaymentFormOutput; idempotencyKey: string }) =>
      ManagerFinanceApi.createPayment(payload, idempotencyKey),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ManagerFinanceQueryKeys.all });
    }
  });
  return { createPayment };
}
