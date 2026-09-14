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
            return apiFetch<ApiResponse<z.infer<typeof subscriptionDataSchema>>>('/api/admin/subscriptions/fetchSubscription', { method: 'GET', dataSchema: subscriptionDataSchema });
        },
  fetchPlans: async () => {
            return apiFetch<ApiResponse<z.infer<typeof array>>>('/api/admin/subscriptions/fetchPlans', { method: 'GET', dataSchema: z.array(saaSPlanSchema) });
        },
  fetchInvoices: async () => {
          return apiFetch<ApiResponse<z.infer<typeof array>>>('/api/admin/subscriptions/fetchInvoices', { method: 'GET', dataSchema: z.array(invoiceSchema) });
      },
  fetchPaymentMethods: async () => {
          return apiFetch<ApiResponse<z.infer<typeof array>>>('/api/admin/subscriptions/fetchPaymentMethods', { method: 'GET', dataSchema: z.array(paymentMethodSchema) });
      },
  fetchKPIs: async () => {
          return apiFetch<ApiResponse<z.infer<typeof subscriptionKPISchema>>>('/api/admin/subscriptions/fetchKPIs', { method: 'GET', dataSchema: subscriptionKPISchema });
      },
  upgradePlan: async (planId: string) => {
          return apiFetch('/api/admin/subscriptions/upgradePlan', { method: 'POST', body: JSON.stringify(planId), dataSchema: z.unknown() });
      },
  toggleAutoRenew: async () => {
          return apiFetch('/api/admin/subscriptions/toggleAutoRenew', { method: 'POST', dataSchema: z.unknown() });
      },
  setDefaultPaymentMethod: async (id: string) => {
          return apiFetch('/api/admin/subscriptions/setDefaultPaymentMethod', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  removePaymentMethod: async (id: string) => {
          return apiFetch('/api/admin/subscriptions/removePaymentMethod', { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
};
