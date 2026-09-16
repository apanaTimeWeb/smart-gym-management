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
  fetchInvoices: async () => {
    return apiFetch<ApiResponse<Invoice[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchInvoices`, { method: 'GET', dataSchema: z.array(invoiceSchema) });
  },
  fetchPaymentMethods: async () => {
    return apiFetch<ApiResponse<PaymentMethod[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchPaymentMethods`, { method: 'GET', dataSchema: z.array(paymentMethodSchema) });
  },
  fetchKPIs: async () => {
    return apiFetch<ApiResponse<SubscriptionKPIData>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: subscriptionKpiDataSchema });
  },
  upgradePlan: async (planId: string) => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/upgradePlan`, { method: 'POST', body: JSON.stringify(planId), dataSchema: z.null() });
      },
  toggleAutoRenew: async () => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/toggleAutoRenew`, { method: 'POST', dataSchema: z.null() });
      },
  setDefaultPaymentMethod: async (id: string) => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/setDefaultPaymentMethod`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.null() });
      },
  removePaymentMethod: async (id: string) => {
          return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/removePaymentMethod`, { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.null() });
      },
};
