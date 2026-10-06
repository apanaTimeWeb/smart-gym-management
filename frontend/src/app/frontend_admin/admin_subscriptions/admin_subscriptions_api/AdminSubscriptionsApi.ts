// RESPONSIBILITY: API client for the Subscriptions / Billing module.
import { ADMIN_SUBSCRIPTIONS_API } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_url_config';
import { saaSPlanSchema, invoiceSchema, paymentMethodSchema, subscriptionKpiDataSchema, currentSubscriptionSchema } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_schemas/AdminSubscriptionsSchemas';
import type { CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';
import { z } from 'zod';
import { apiFetch, type ApiResponse } from "@/lib/api";

export const AdminSubscriptionsApi = {
  fetchSubscription: async () => {
    return apiFetch<ApiResponse<CurrentSubscription>>(ADMIN_SUBSCRIPTIONS_API.subscription, { method: 'GET', dataSchema: currentSubscriptionSchema });
  },
  fetchPlans: async () => {
    return apiFetch<ApiResponse<SaaSPlan[]>>(ADMIN_SUBSCRIPTIONS_API.plans, { method: 'GET', dataSchema: z.array(saaSPlanSchema) });
  },
  fetchInvoices: async (params: { page: number; limit: number }) => {
    const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) }).toString();
    return apiFetch<ApiResponse<Invoice[]>>(`${ADMIN_SUBSCRIPTIONS_API.invoices}?${query}`, { method: 'GET', dataSchema: z.array(invoiceSchema) });
  },
  fetchPaymentMethods: async () => {
    return apiFetch<ApiResponse<PaymentMethod[]>>(ADMIN_SUBSCRIPTIONS_API.paymentMethods, { method: 'GET', dataSchema: z.array(paymentMethodSchema) });
  },
  fetchKPIs: async () => {
    return apiFetch<ApiResponse<SubscriptionKPIData>>(ADMIN_SUBSCRIPTIONS_API.kpis, { method: 'GET', dataSchema: subscriptionKpiDataSchema });
  },
  upgradePlan: async (planId: string, idempotencyKey: string) => {
          return apiFetch<ApiResponse<null>>(ADMIN_SUBSCRIPTIONS_API.upgradePlan, { method: 'POST', body: JSON.stringify({ planId }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
  toggleAutoRenew: async (idempotencyKey: string) => {
          return apiFetch<ApiResponse<null>>(ADMIN_SUBSCRIPTIONS_API.toggleAutoRenew, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
  setDefaultPaymentMethod: async (id: string, idempotencyKey: string) => {
          return apiFetch<ApiResponse<null>>(ADMIN_SUBSCRIPTIONS_API.setDefaultPaymentMethod, { method: 'POST', body: JSON.stringify({ id }), dataSchema: z.null(),
              headers: { 'Idempotency-Key': idempotencyKey }
        });
      },
  removePaymentMethod: async (id: string, idempotencyKey: string) => {
          return apiFetch<ApiResponse<null>>(ADMIN_SUBSCRIPTIONS_API.removePaymentMethod, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
};
