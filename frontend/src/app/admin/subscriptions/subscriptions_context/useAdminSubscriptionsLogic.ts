"use client";
// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsLogic consumers.
// RESPONSIBILITY: Business logic hook for Subscriptions — queries and mutations.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { subscriptionsApi } from '@/app/admin/subscriptions/subscriptions_api/AdminSubscriptionsApi';
import { useAdminSubscriptionsStore } from '@/app/admin/subscriptions/subscriptions_store/useAdminSubscriptionsStore';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminIdempotencyIntentStore';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/admin/subscriptions/subscriptions_utils/AdminSubscriptionsSharedConstants';

export function useAdminSubscriptionsLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const { showUpgradeConfirm, setShowUpgradeConfirm, currentInvoicePage, setCurrentInvoicePage } = useAdminSubscriptionsStore();

  const subscriptionQuery = useQuery({
    queryKey: ['admin', 'subscriptions', 'subscription'],
    queryFn: () => subscriptionsApi.fetchSubscription().then(r => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const plansQuery = useQuery({
    queryKey: ['admin', 'subscriptions', 'plans'],
    queryFn: () => subscriptionsApi.fetchPlans().then(r => r.data || []),
    staleTime: 1000 * 60 * 10,
  });

  const invoicesQuery = useQuery({
    queryKey: ['admin', 'subscriptions', 'invoices', { page: currentInvoicePage, limit: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE }],
    queryFn: () => subscriptionsApi.fetchInvoices({ page: currentInvoicePage, limit: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE }),
    staleTime: 1000 * 60 * 5,
  });

  const paymentMethodsQuery = useQuery({
    queryKey: ['admin', 'subscriptions', 'payment-methods'],
    queryFn: () => subscriptionsApi.fetchPaymentMethods().then(r => r.data || []),
    staleTime: 1000 * 60 * 5,
  });

  const kpisQuery = useQuery({
    queryKey: ['admin', 'subscriptions', 'kpis'],
    queryFn: () => subscriptionsApi.fetchKPIs().then(r => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const subscription = subscriptionQuery.data;
  const plans = plansQuery.data ?? [];
  const invoices = invoicesQuery.data?.data ?? [];
  const invoiceTotal = invoicesQuery.data?.meta?.total ?? invoices.length;
  const invoiceTotalPages = invoicesQuery.data?.meta?.totalPages ?? Math.max(1, Math.ceil(invoiceTotal / ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE));
  const paymentMethods = paymentMethodsQuery.data ?? [];
  const kpis = kpisQuery.data;
  const status = subscriptionQuery.status;

  const upgradeMutation = useMutation({
    mutationFn: ({ planId, idempotencyKey }: { planId: string; idempotencyKey: string }) => subscriptionsApi.upgradePlan(planId, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-22dbbbf6'); idempotencyKeysRef.current.delete(`upgrade-plan:${variables.planId}`);
      setShowUpgradeConfirm(null);
      qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'subscription'] });
      qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'kpis'] });
      qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'plans'] });
    },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-adfbfcf78b'),
  });

  const autoRenewMutation = useMutation({
    mutationFn: (idempotencyKey: string) => subscriptionsApi.toggleAutoRenew(idempotencyKey),
    onSuccess: (response, idempotencyKey) => { adminToast.success(response.message, 'admin-success-8bbeec64');
      idempotencyKeysRef.current.delete('toggle-auto-renew');
      qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'subscription'] });
    },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-1067ba6b06'),
  });

  const setDefaultPMMutation = useMutation({
    mutationFn: (id: string) => subscriptionsApi.setDefaultPaymentMethod(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-235b8623c8'); qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'payment-methods'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-638550b7de'),
  });

  const removePMMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => subscriptionsApi.removePaymentMethod(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-83e444b113'); idempotencyKeysRef.current.delete(`remove-payment-method:${variables.id}`); qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'payment-methods'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-3b8d91063d'),
  });

  async function handleUpgrade(planId: string, planName: string) {
    const intentId = `upgrade-plan:${planId}`;
    const ok = await confirm({
      title: `Upgrade to ${planName}`,
      message: `You are about to upgrade your subscription to the ${planName} plan. Your billing will be updated immediately.`,
      confirmText: 'Confirm Upgrade',
      type: 'info',
    });
    if (!ok) { clearIntentKey(intentId); return; }
    upgradeMutation.mutate({ planId, idempotencyKey: getIntentKey(intentId) });
  }

  async function handleRemovePaymentMethod(id: string) {
    const intentId = `remove-payment-method:${id}`;
    const ok = await confirm({
      title: 'Remove Payment Method',
      message: 'Are you sure you want to remove this payment method?',
      confirmText: 'Remove',
      type: 'danger',
    });
    if (!ok) { clearIntentKey(intentId); return; }
    removePMMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }

  return {
    subscription, plans, invoices, paymentMethods, kpis,
    currentInvoicePage, setCurrentInvoicePage, invoiceTotal, invoiceTotalPages,
    invoiceItemsPerPage: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE,
    status,
    isLoading: subscriptionQuery.isPending || plansQuery.isPending || invoicesQuery.isPending || paymentMethodsQuery.isPending,
    handleUpgrade, upgrading: upgradeMutation.isPending,
    toggleAutoRenew: async () => {
      const intentId = 'toggle-auto-renew';
      const nextState = subscription?.autoRenew ? 'off' : 'on';
      const ok = await confirm({ title: 'Change Auto-Renew', message: `Auto-renew will be turned ${nextState} for the current subscription.`, confirmText: 'Confirm', type: 'warning' });
      if (!ok) { clearIntentKey(intentId); return; }
      autoRenewMutation.mutate(getIntentKey(intentId));
    },
    togglingAutoRenew: autoRenewMutation.isPending,
    setDefaultPaymentMethod: (id: string) => setDefaultPMMutation.mutate(id),
    handleRemovePaymentMethod,
    showUpgradeConfirm, setShowUpgradeConfirm,
  };
}
