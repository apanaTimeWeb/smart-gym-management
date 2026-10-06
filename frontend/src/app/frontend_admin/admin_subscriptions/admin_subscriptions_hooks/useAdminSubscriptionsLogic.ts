"use client";
// RESPONSIBILITY: Business logic hook for Subscriptions — queries and mutations.
import { ADMIN_SUBSCRIPTIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsQueryKeys';
import { useTranslations } from 'next-intl';
// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsLogic consumers.


import { useCallback } from 'react';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_store/useAdminSubscriptionsStore';
import { useAdminSubscriptionsQueries } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsQueries';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsConstants';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsMutations';
/**
 * @description useAdminSubscriptionsLogic: Business logic hook for Subscriptions — queries and mutations.
 * @dependencies Consumes AdminSubscriptionsQueryKeys, useAdminSubscriptionsStore, useAdminSubscriptionsQueries, useAdminLayoutConfirm, AdminSubscriptionsConstants, useAdminSubscriptionsMutations.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminSubscriptionsLogic() {
  const t = useTranslations();
  const { confirm } = useAdminLayoutConfirm();
  const { showUpgradeConfirm, setShowUpgradeConfirm, currentInvoicePage, setCurrentInvoicePage } = useAdminSubscriptionsStore();

  const {
    subscription,
    plans,
    invoices,
    invoiceTotal,
    invoiceTotalPages,
    paymentMethods,
    kpis,
    status,
    isPending,
  } = useAdminSubscriptionsQueries();

  const { upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey } = useAdminSubscriptionsMutations();

  async function handleUpgrade(planId: string, planName: string) {
    const intentId = `upgrade-plan:${planId}`;
    const ok = await confirm({
      title: t('subscriptions.AdminSubscriptionsConfirm.upgradeTitle', { planName }),
      message: t('subscriptions.AdminSubscriptionsConfirm.upgradeMessage', { planName }),
      confirmText: t('subscriptions.AdminSubscriptionsConfirm.upgradeConfirm'),
      type: 'info',
    });
    if (!ok) { clearIntentKey(intentId); return; }
    upgradeMutation.mutate({ planId, idempotencyKey: getIntentKey(intentId) });
  }

  async function handleRemovePaymentMethod(id: string) {
    const intentId = `remove-payment-method:${id}`;
    const ok = await confirm({
      title: t('subscriptions.AdminSubscriptionsConfirm.removeTitle'),
      message: t('subscriptions.AdminSubscriptionsConfirm.removeMessage'),
      confirmText: t('subscriptions.AdminSubscriptionsConfirm.removeConfirm'),
      type: 'danger',
    });
    if (!ok) { clearIntentKey(intentId); return; }
    removePMMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }

  const handleSetDefaultPaymentMethod = async (id: string) => {
    const intentId = `set-default-payment-method:${id}`;
    const ok = await confirm({
      title: t('subscriptions.AdminSubscriptionsConfirm.setDefaultTitle'),
      message: t('subscriptions.AdminSubscriptionsConfirm.setDefaultMessage'),
      confirmText: t('subscriptions.AdminSubscriptionsConfirm.setDefaultConfirm'),
      type: 'warning',
    });
    if (!ok) { clearIntentKey(intentId); return; }
    setDefaultPMMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  };

  return {
    subscription, plans, invoices, paymentMethods, kpis,
    currentInvoicePage, setCurrentInvoicePage, invoiceTotal, invoiceTotalPages,
    invoiceItemsPerPage: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE,
    status,
    isPending,
    handleUpgrade, upgrading: upgradeMutation.isPending,
    toggleAutoRenew: async () => {
      const intentId = 'toggle-auto-renew';
      const nextState = subscription?.autoRenew ? 'off' : 'on';
      const ok = await confirm({ title: t('subscriptions.AdminSubscriptionsConfirm.autoRenewTitle'), message: t('subscriptions.AdminSubscriptionsConfirm.autoRenewMessage', { nextState }), confirmText: t('subscriptions.AdminSubscriptionsConfirm.autoRenewConfirm'), type: 'warning' });
      if (!ok) { clearIntentKey(intentId); return; }
      autoRenewMutation.mutate(getIntentKey(intentId));
    },
    togglingAutoRenew: autoRenewMutation.isPending,
    setDefaultPaymentMethod: handleSetDefaultPaymentMethod,
    settingDefaultPaymentMethod: setDefaultPMMutation.isPending,
    handleRemovePaymentMethod,
    showUpgradeConfirm, setShowUpgradeConfirm,
  };
}
