// RESPONSIBILITY: Owns MSW handlers for the Admin subscriptions feature.
// DATA FLOW: subscriptions API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_CURRENT_SUBSCRIPTION, MOCK_PAYMENT_METHODS, MOCK_SAAS_PLANS, MOCK_INVOICES, MOCK_SUBSCRIPTION_KPI } from '@/app/admin/subscriptions/subscriptions_mocks/fixtures/AdminSubscriptionsMockFixtures';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};


let subscriptionState = structuredClone(MOCK_CURRENT_SUBSCRIPTION);
let paymentMethodsState = structuredClone(MOCK_PAYMENT_METHODS);

export const adminSubscriptionsMockHandlers = [
  http.get('*/admin/subscriptions/fetchSubscription', () => ok(subscriptionState)),
  http.get('*/admin/subscriptions/fetchPlans', () => ok(MOCK_SAAS_PLANS)),
  http.get('*/admin/subscriptions/fetchInvoices', () => ok(MOCK_INVOICES)),
  http.get('*/admin/subscriptions/fetchPaymentMethods', () => ok(paymentMethodsState)),
  http.get('*/admin/subscriptions/fetchKPIs', () => ok(MOCK_SUBSCRIPTION_KPI)),
  http.post('*/admin/subscriptions/upgradePlan', async ({ request }) => { const raw = await parseRequestBody(request); const body = asRecord(raw); const planId = typeof raw === 'string' ? raw : String(body.planId ?? body.id ?? ''); const plan = MOCK_SAAS_PLANS.find(p => p.id === planId); if (plan) subscriptionState = { ...subscriptionState, planId: plan.id, planName: plan.name, tier: plan.tier, monthlyPrice: plan.monthlyPrice, annualPrice: plan.annualPrice }; return ok(subscriptionState, 'Plan upgraded'); }),
  http.post('*/admin/subscriptions/toggleAutoRenew', () => ok(null, 'Auto-renewal updated')),
  http.post('*/admin/subscriptions/setDefaultPaymentMethod', async ({ request }) => { const raw = await parseRequestBody(request); const body = asRecord(raw); const id = typeof raw === 'string' ? raw : String(body.id ?? body.paymentMethodId ?? ''); paymentMethodsState = paymentMethodsState.map(p => ({ ...p, isDefault: p.id === id })); return ok(paymentMethodsState.find(p => p.id === id) ?? null, 'Default payment method updated'); }),
  http.delete('*/admin/subscriptions/removePaymentMethod', async ({ request }) => { const raw = await parseRequestBody(request); const body = asRecord(raw); const id = typeof raw === 'string' ? raw : String(body.id ?? body.paymentMethodId ?? ''); paymentMethodsState = paymentMethodsState.filter(p => p.id !== id || p.isDefault); return ok(null, 'Payment method removed'); })
];
