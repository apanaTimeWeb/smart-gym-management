import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import type { SubscriptionPlan } from '@/app/superadmin/plans/superadmin_plans_types/superadmin_plans_types';

const BASE_URL = '*/superadmin/plans';

const INITIAL_PLANS: SubscriptionPlan[] = [
  { id: 'plan-starter', name: 'Starter Plan', priceMonthly: 4999, priceAnnual: 49990, maxMembers: 100, maxStaff: 5, dbLimitGb: 5, binaryLimitGb: 10, features: ['Core App', 'Basic Reports'], activeTenants: 28, isPublic: true, trialDays: 14, setupFee: 0, currency: 'INR', isArchived: false },
  { id: 'plan-basic', name: 'Basic Plan', priceMonthly: 9999, priceAnnual: 99990, maxMembers: 300, maxStaff: 12, dbLimitGb: 10, binaryLimitGb: 25, features: ['Core App', 'Reports', 'Messaging'], activeTenants: 41, isPublic: true, trialDays: 14, setupFee: 1999, currency: 'INR', isArchived: false },
  { id: 'plan-pro', name: 'Pro Plan', priceMonthly: 19999, priceAnnual: 199990, maxMembers: 800, maxStaff: 30, dbLimitGb: 25, binaryLimitGb: 75, features: ['Advanced Reports', 'API Access', 'Automation'], activeTenants: 63, isPublic: true, trialDays: 21, setupFee: 4999, currency: 'INR', isArchived: false },
  { id: 'plan-growth', name: 'Growth Plan', priceMonthly: 29999, priceAnnual: 299990, maxMembers: 1500, maxStaff: 60, dbLimitGb: 50, binaryLimitGb: 150, features: ['Analytics', 'Priority Support', 'API Access'], activeTenants: 37, isPublic: true, trialDays: 30, setupFee: 7999, currency: 'INR', isArchived: false },
  { id: 'plan-enterprise', name: 'Enterprise Plan', priceMonthly: 59999, priceAnnual: 599990, maxMembers: 5000, maxStaff: 200, dbLimitGb: 100, binaryLimitGb: 500, features: ['Dedicated Support', 'SSO', 'Advanced Analytics'], activeTenants: 19, isPublic: true, trialDays: 30, setupFee: 14999, currency: 'INR', isArchived: false },
  { id: 'plan-legacy', name: 'Legacy Plan', priceMonthly: 7499, priceAnnual: 74990, maxMembers: 150, maxStaff: 8, dbLimitGb: 8, binaryLimitGb: 15, features: ['Core App', 'Legacy Reports'], activeTenants: 4, isPublic: false, trialDays: 7, setupFee: 0, currency: 'INR', isArchived: true },
];

export let mockPlansList: SubscriptionPlan[] = [...INITIAL_PLANS];

export const superadminPlansHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const status = url.searchParams.get('status');
    const filtered = mockPlansList.filter((plan) => {
      const matchesSearch = !search || plan.name.toLowerCase().includes(search) || plan.id.toLowerCase().includes(search);
      const matchesStatus = !status || status === 'ALL' || (status === 'ARCHIVED' ? plan.isArchived : !plan.isArchived);
      return matchesSearch && matchesStatus;
    });
    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return HttpResponse.json({ success: true, message: 'Success', data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  }),
  http.get(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(200);
    const plan = mockPlansList.find((item) => item.id === params.id);
    return plan
      ? HttpResponse.json({ success: true, message: 'Success', data: plan })
      : HttpResponse.json({ success: false, message: 'Plan not found', data: null }, { status: StatusCodes.NOT_FOUND });
  }),
  http.post(BASE_URL, async ({ request }) => {
    await delay(350);
    const body = await request.json() as Omit<SubscriptionPlan, 'id' | 'activeTenants' | 'isArchived'>;
    const newPlan: SubscriptionPlan = { ...body, id: `plan-${Date.now()}`, activeTenants: 0, isArchived: false };
    mockPlansList = [...mockPlansList, newPlan];
    return HttpResponse.json({ success: true, message: 'Created', data: newPlan });
  }),
  http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
    await delay(350);
    const body = await request.json() as Partial<SubscriptionPlan>;
    const current = mockPlansList.find((item) => item.id === params.id);
    if (!current) return HttpResponse.json({ success: false, message: 'Plan not found', data: null }, { status: StatusCodes.NOT_FOUND });
    const updated = { ...current, ...body };
    mockPlansList = mockPlansList.map((item) => item.id === params.id ? updated : item);
    return HttpResponse.json({ success: true, message: 'Updated', data: updated });
  }),
  http.delete(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(300);
    mockPlansList = mockPlansList.filter((item) => item.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Deleted', data: null });
  }),
  http.patch(`${BASE_URL}/:id/archive`, async ({ params }) => {
    await delay(300);
    const updated = mockPlansList.find((item) => item.id === params.id);
    if (!updated) return HttpResponse.json({ success: false, message: 'Plan not found', data: null }, { status: StatusCodes.NOT_FOUND });
    mockPlansList = mockPlansList.map((item) => item.id === params.id ? { ...item, isArchived: true } : item);
    return HttpResponse.json({ success: true, message: 'Archived', data: { ...updated, isArchived: true } });
  }),
];
