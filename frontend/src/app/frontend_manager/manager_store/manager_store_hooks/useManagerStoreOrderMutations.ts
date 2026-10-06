'use client';
// DATA FLOW: Confirmed POS intent → mutation hook → ManagerStoreApi → authoritative response → query invalidation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { ManagerStoreApi } from '@/app/frontend_manager/manager_store/manager_store_api/ManagerStoreApi';
import { ManagerStoreQueryKeys } from '@/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreQueryKeys';
import { STORE_COMPLETED_ORDER_STATUS } from '@/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreSharedConstants';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import type { OrderItem } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';

/**
 * @description Owns Store POS order creation and retry-safe idempotency lifecycle.
 * @dependencies Uses ManagerStoreApi, ManagerStoreQueryKeys, ManagerIdempotency, ManagerToastService.
 * @edge-case Reuses one idempotency key for a confirmed intent until success or abandonment.
 */
export function useManagerStoreOrderMutations(
  orderItems: OrderItem[],
  orderMethod: string,
  customerPhone: string,
  sendViaWhatsapp: boolean,
  orderTotal: number,
  onSuccess: (response: Awaited<ReturnType<typeof ManagerStoreApi.createOrder>>) => Promise<void> | void,
) {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const place = useMutation({
    mutationFn: async () => {
      const idempotencyKey = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
      idempotencyKeyRef.current = idempotencyKey;
      return ManagerStoreApi.createOrder({
        items: orderItems.map((item) => ({ productId: item.productId, qty: item.qty, price: item.price })),
        method: orderMethod,
        notes: sendViaWhatsapp && customerPhone ? `WhatsApp: ${customerPhone}` : undefined,
        customerName: customerPhone || 'Walk-in',
        total: orderTotal,
        status: STORE_COMPLETED_ORDER_STATUS,
      }, idempotencyKey);
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerStoreQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ManagerStoreQueryKeys.summary() });
      idempotencyKeyRef.current = null;
      await onSuccess(response);
    },
    onError: (error: unknown) => showManagerErrorToast(error, 'manager-store-order-error'),
  });
  return {
    placeOrder: () => place.mutateAsync(),
    isPlacingOrder: place.isPending,
    resetIdempotency: () => { idempotencyKeyRef.current = null; },
  };
}
