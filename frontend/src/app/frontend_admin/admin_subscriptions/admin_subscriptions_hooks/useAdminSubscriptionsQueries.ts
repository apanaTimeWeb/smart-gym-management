"use client";
// DATA FLOW: module-owned API contracts -> TanStack Query -> subscriptions view/mutation orchestration.
import { ADMIN_SUBSCRIPTIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_api/AdminSubscriptionsApi';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsConstants';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_store/useAdminSubscriptionsStore';
/**
 * @description useAdminSubscriptionsQueries: Owns the useAdminSubscriptionsQueries responsibility for the admin_subscriptions feature.
 * @dependencies Consumes AdminSubscriptionsQueryKeys, AdminSubscriptionsApi, AdminSubscriptionsConstants, useAdminSubscriptionsStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminSubscriptionsQueries() {
  const { currentInvoicePage } = useAdminSubscriptionsStore();
  const subscriptionQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('subscription'),
    queryFn: () => AdminSubscriptionsApi.fetchSubscription().then((response) => response.data),
    staleTime: 1000 * 60 * 5,
  });
  const plansQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('plans'),
    queryFn: () => AdminSubscriptionsApi.fetchPlans().then((response) => response.data ?? []),
    staleTime: 1000 * 60 * 10,
  });
  const invoicesQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('invoices', { page: currentInvoicePage, limit: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE }),
    queryFn: () => AdminSubscriptionsApi.fetchInvoices({ page: currentInvoicePage, limit: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE }),
    staleTime: 1000 * 60 * 5,
  });
  const paymentMethodsQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('payment-methods'),
    queryFn: () => AdminSubscriptionsApi.fetchPaymentMethods().then((response) => response.data ?? []),
    staleTime: 1000 * 60 * 5,
  });
  const kpisQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('kpis'),
    queryFn: () => AdminSubscriptionsApi.fetchKPIs().then((response) => response.data),
    staleTime: 1000 * 60 * 5,
  });
  const invoices = invoicesQuery.data?.data ?? [];
  const invoiceTotal = invoicesQuery.data?.meta?.total ?? invoices.length;
  const invoiceTotalPages = invoicesQuery.data?.meta?.totalPages ?? Math.max(1, Math.ceil(invoiceTotal / ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE));
  return {
    subscription: subscriptionQuery.data,
    plans: plansQuery.data ?? [],
    invoices,
    invoiceTotal,
    invoiceTotalPages,
    paymentMethods: paymentMethodsQuery.data ?? [],
    kpis: kpisQuery.data,
    status: subscriptionQuery.status,
    isPending: subscriptionQuery.isPending || plansQuery.isPending || invoicesQuery.isPending || paymentMethodsQuery.isPending,
  };
}
