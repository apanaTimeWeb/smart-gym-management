"use client";

// DATA FLOW: Subscription confirmation/action → mutation hook → AdminSubscriptionsApi → TanStack Query invalidation → subscription UI and backend feedback.
// RESPONSIBILITY: Owns all Admin Subscriptions mutations, invalidation, feedback, and idempotency.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_SUBSCRIPTIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsQueryKeys';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_api/AdminSubscriptionsApi';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_store/useAdminSubscriptionsStore';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
/**
 * @description useAdminSubscriptionsMutations: Owns all Admin Subscriptions mutations, invalidation, feedback, and idempotency.
 * @dependencies Consumes AdminSubscriptionsQueryKeys, AdminSubscriptionsApi, useAdminSubscriptionsStore, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminSubscriptionsMutations() {
  const queryClient = useQueryClient();
  const store = useAdminSubscriptionsStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const upgradeMutation = useMutation({
    mutationFn: ({ planId, idempotencyKey }: { planId: string; idempotencyKey: string }) => AdminSubscriptionsApi.upgradePlan(planId, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(`upgrade-plan:${variables.planId}`); adminToast.success(response.message, 'admin-success-22dbbbf6'); store.setShowUpgradeConfirm(null); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('subscription') }); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('kpis') }); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('plans') }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-adfbfcf78b'); },
  });
  const autoRenewMutation = useMutation({
    mutationFn: (idempotencyKey: string) => AdminSubscriptionsApi.toggleAutoRenew(idempotencyKey),
    onSuccess: (response) => { clearIntentKey('toggle-auto-renew'); adminToast.success(response.message, 'admin-success-8bbeec64'); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('subscription') }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-1067ba6b06'); },
  });
  const setDefaultPMMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminSubscriptionsApi.setDefaultPaymentMethod(id, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(`set-default-payment-method:${variables.id}`); adminToast.success(response.message, 'admin-success-235b8623c8'); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('payment-methods') }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-638550b7de'); },
  });
  const removePMMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminSubscriptionsApi.removePaymentMethod(id, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(`remove-payment-method:${variables.id}`); adminToast.success(response.message, 'admin-success-83e444b113'); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('payment-methods') }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-3b8d91063d'); },
  });
  return { upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey };
}
