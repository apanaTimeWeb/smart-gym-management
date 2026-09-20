// RESPONSIBILITY: Owns MSW handlers for the Admin subscriptions feature.
// DATA FLOW: subscriptions API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_CURRENT_SUBSCRIPTION, MOCK_PAYMENT_METHODS, MOCK_SAAS_PLANS, MOCK_INVOICES, MOCK_SUBSCRIPTION_KPI } from '@/app/admin/subscriptions/subscriptions_mocks/fixtures/AdminSubscriptionsMockFixtures';
import { paginateAdminSubscriptionsInvoices } from '@/app/admin/subscriptions/subscriptions_utils/AdminSubscriptionsPaginateInvoices';

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data });

let subscriptionState = structuredClone(MOCK_CURRENT_SUBSCRIPTION);
let paymentMethodsState = structuredClone(MOCK_PAYMENT_METHODS);

export const adminSubscriptionsMockHandlers = [
  http.get('*/admin/subscriptions/fetchSubscription', () => ok(subscriptionState)),
  http.get('*/admin/subscriptions/fetchPlans', () => ok(MOCK_SAAS_PLANS)),
  http.get('*/admin/subscriptions/fetchInvoices', ({ request }) => { const url = new URL(request.url); const page = Math.max(1, Number(url.searchParams.get('page')) || 1); const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10); const pagination = paginateAdminSubscriptionsInvoices(MOCK_INVOICES, page, limit); return HttpResponse.json({ success: true, message: 'Invoice history loaded', data: pagination.items, meta: { total: pagination.total, page: pagination.page, limit: pagination.limit, totalPages: pagination.totalPages, hasNextPage: pagination.hasNextPage, hasPrevPage: pagination.hasPrevPage } }); }),
  http.get('*/admin/subscriptions/fetchPaymentMethods', () => ok(paymentMethodsState)),
  http.get('*/admin/subscriptions/fetchKPIs', () => ok(MOCK_SUBSCRIPTION_KPI)),
  http.post('*/admin/subscriptions/upgradePlan', async ({ request }) => { const body = (await request.json()) as { planId?: string; id?: string }; const planId = String(body.planId ?? body.id ?? ''); const plan = MOCK_SAAS_PLANS.find(p => p.id === planId); if (plan) subscriptionState = { ...subscriptionState, planId: plan.id, planName: plan.name, tier: plan.tier, monthlyPrice: plan.monthlyPrice, annualPrice: plan.annualPrice }; return ok(null, 'Plan upgraded'); }),
  http.post('*/admin/subscriptions/toggleAutoRenew', () => { subscriptionState = { ...subscriptionState, autoRenew: !subscriptionState.autoRenew }; return ok(null, 'Auto-renewal updated'); }),
  http.post('*/admin/subscriptions/setDefaultPaymentMethod', async ({ request }) => { const body = (await request.json()) as { id?: string; paymentMethodId?: string }; const id = String(body.id ?? body.paymentMethodId ?? ''); paymentMethodsState = paymentMethodsState.map(p => ({ ...p, isDefault: p.id === id })); return ok(null, 'Default payment method updated'); }),
  http.delete('*/admin/subscriptions/removePaymentMethod', async ({ request }) => { const body = (await request.json()) as { id?: string; paymentMethodId?: string }; const id = String(body.id ?? body.paymentMethodId ?? ''); paymentMethodsState = paymentMethodsState.filter(p => p.id !== id || p.isDefault); return ok(null, 'Payment method removed'); })
];
