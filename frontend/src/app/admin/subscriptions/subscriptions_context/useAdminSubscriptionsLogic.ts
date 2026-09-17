"use client";
// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsLogic consumers.
// RESPONSIBILITY: Business logic hook for Subscriptions — queries and mutations.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminToast } from '@/app/admin/admin_components/AdminFeedback/AdminToastService';
import { subscriptionsApi } from '@/app/admin/subscriptions/subscriptions_api/AdminSubscriptionsApi';
import { useAdminSubscriptionsStore } from '@/app/admin/subscriptions/subscriptions_store/useAdminSubscriptionsStore';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';

export function useAdminSubscriptionsLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const { showUpgradeConfirm, setShowUpgradeConfirm } = useAdminSubscriptionsStore();

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
    queryKey: ['admin', 'subscriptions', 'invoices'],
    queryFn: () => subscriptionsApi.fetchInvoices().then(r => r.data || []),
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
  const invoices = invoicesQuery.data ?? [];
  const paymentMethods = paymentMethodsQuery.data ?? [];
  const kpis = kpisQuery.data;
  const status = subscriptionQuery.status;

  const upgradeMutation = useMutation({
    mutationFn: (planId: string) => subscriptionsApi.upgradePlan(planId),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-22dbbbf6');
      setShowUpgradeConfirm(null);
      qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'subscription'] });
      qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'kpis'] });
      qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'plans'] });
    },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-adfbfcf78b'),
  });

  const autoRenewMutation = useMutation({
    mutationFn: subscriptionsApi.toggleAutoRenew,
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-8bbeec64');
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
    mutationFn: (id: string) => subscriptionsApi.removePaymentMethod(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-83e444b113'); qc.invalidateQueries({ queryKey: ['admin', 'subscriptions', 'payment-methods'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-3b8d91063d'),
  });

  async function handleUpgrade(planId: string, planName: string) {
    const ok = await confirm({
      title: `Upgrade to ${planName}`,
      message: `You are about to upgrade your subscription to the ${planName} plan. Your billing will be updated immediately.`,
      confirmText: 'Confirm Upgrade',
      type: 'info',
    });
    if (!ok) return;
    upgradeMutation.mutate(planId);
  }

  async function handleRemovePaymentMethod(id: string) {
    const ok = await confirm({
      title: 'Remove Payment Method',
      message: 'Are you sure you want to remove this payment method?',
      confirmText: 'Remove',
      type: 'danger',
    });
    if (!ok) return;
    removePMMutation.mutate(id);
  }

  return {
    subscription, plans, invoices, paymentMethods, kpis,
    status,
    isLoading: subscriptionQuery.isPending || plansQuery.isPending || invoicesQuery.isPending || paymentMethodsQuery.isPending,
    handleUpgrade, upgrading: upgradeMutation.isPending,
    toggleAutoRenew: () => autoRenewMutation.mutate(),
    togglingAutoRenew: autoRenewMutation.isPending,
    setDefaultPaymentMethod: (id: string) => setDefaultPMMutation.mutate(id),
    handleRemovePaymentMethod,
    showUpgradeConfirm, setShowUpgradeConfirm,
  };
}
