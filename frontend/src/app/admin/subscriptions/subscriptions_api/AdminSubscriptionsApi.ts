import { AdminSubscriptionsUrlConfig } from '@/app/admin/subscriptions/admin_subscriptions_url_config';
import { saaSPlanSchema, invoiceSchema, paymentMethodSchema, subscriptionKpiDataSchema, currentSubscriptionSchema } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsSchemas';
// RESPONSIBILITY: API client for the Subscriptions / Billing module.
import type { CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';
import { z } from 'zod';
import { apiFetch, type ApiResponse } from "@/lib/api";

export const subscriptionsApi = {
  fetchSubscription: async () => {
    return apiFetch<ApiResponse<CurrentSubscription>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchSubscription`, { method: 'GET', dataSchema: currentSubscriptionSchema });
  },
  fetchPlans: async () => {
    return apiFetch<ApiResponse<SaaSPlan[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchPlans`, { method: 'GET', dataSchema: z.array(saaSPlanSchema) });
  },
  fetchInvoices: async (params: { page: number; limit: number }) => {
    const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) }).toString();
    return apiFetch<ApiResponse<Invoice[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchInvoices?${query}`, { method: 'GET', dataSchema: z.array(invoiceSchema) });
  },
  fetchPaymentMethods: async () => {
    return apiFetch<ApiResponse<PaymentMethod[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchPaymentMethods`, { method: 'GET', dataSchema: z.array(paymentMethodSchema) });
  },
  fetchKPIs: async () => {
    return apiFetch<ApiResponse<SubscriptionKPIData>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: subscriptionKpiDataSchema });
  },
  upgradePlan: async (planId: string, idempotencyKey: string) => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/upgradePlan`, { method: 'POST', body: JSON.stringify(planId), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
  toggleAutoRenew: async (idempotencyKey: string) => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/toggleAutoRenew`, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
  setDefaultPaymentMethod: async (id: string, idempotencyKey?: string) => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/setDefaultPaymentMethod`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.null(),
              headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
        });
      },
  removePaymentMethod: async (id: string, idempotencyKey: string) => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/removePaymentMethod`, { method: 'DELETE', body: JSON.stringify(id), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
};
