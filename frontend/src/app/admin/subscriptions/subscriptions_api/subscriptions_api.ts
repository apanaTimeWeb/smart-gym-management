import { AdminSubscriptionsUrlConfig } from '@/app/admin/subscriptions/admin_subscriptions_url_config';
import { saaSPlanSchema, invoiceSchema, paymentMethodSchema, subscriptionKPISchema, subscriptionDataSchema } from '@/app/admin/subscriptions/subscriptions_types/subscriptions_schemas';
// RESPONSIBILITY: API client for the Subscriptions / Billing module.
import type { CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData } from '@/app/admin/subscriptions/subscriptions_types/subscriptions_types';
import {
  MOCK_CURRENT_SUBSCRIPTION, MOCK_SAAS_PLANS, MOCK_INVOICES,
  MOCK_PAYMENT_METHODS, MOCK_SUBSCRIPTION_KPI,
} from '@/app/admin/subscriptions/subscriptions_utils/AdminSubscriptionsSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";
export const subscriptionsApi = {
  fetchSubscription: async () => {
            return apiFetch<ApiResponse<z.infer<typeof subscriptionDataSchema>>>(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/fetchSubscription`, { method: 'GET', dataSchema: subscriptionDataSchema });
        },
  fetchPlans: async () => {
            return apiFetch<ApiResponse<z.infer<typeof array>>>(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/fetchPlans`, { method: 'GET', dataSchema: z.array(saaSPlanSchema) });
        },
  fetchInvoices: async () => {
          return apiFetch<ApiResponse<z.infer<typeof array>>>(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/fetchInvoices`, { method: 'GET', dataSchema: z.array(invoiceSchema) });
      },
  fetchPaymentMethods: async () => {
          return apiFetch<ApiResponse<z.infer<typeof array>>>(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/fetchPaymentMethods`, { method: 'GET', dataSchema: z.array(paymentMethodSchema) });
      },
  fetchKPIs: async () => {
          return apiFetch<ApiResponse<z.infer<typeof subscriptionKPISchema>>>(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/fetchKPIs`, { method: 'GET', dataSchema: subscriptionKPISchema });
      },
  upgradePlan: async (planId: string) => {
          return apiFetch(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/upgradePlan`, { method: 'POST', body: JSON.stringify(planId), dataSchema: z.any() });
      },
  toggleAutoRenew: async () => {
          return apiFetch(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/toggleAutoRenew`, { method: 'POST', dataSchema: z.any() });
      },
  setDefaultPaymentMethod: async (id: string) => {
          return apiFetch(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/setDefaultPaymentMethod`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
  removePaymentMethod: async (id: string) => {
          return apiFetch(`${AdminSubscriptionsUrlConfig.BACKEND_API.BASE}/removePaymentMethod`, { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.any() });
      },
};
