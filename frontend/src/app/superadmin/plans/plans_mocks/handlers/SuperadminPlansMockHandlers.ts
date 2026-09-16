import { http, HttpResponse, delay } from 'msw';
const BASE_URL = '*/superadmin/plans';

const MOCK_PLANS = [
  { id: '1', name: 'Starter Plan', basePrice: 49.99, priceMonthly: 4999, currency: 'INR', billingCycle: 'MONTHLY', maxMembers: 100, features: ['Core App', 'Basic Reports'], status: 'ACTIVE' },
  { id: '2', name: 'Pro Plan', basePrice: 99.99, priceMonthly: 9999, currency: 'INR', billingCycle: 'MONTHLY', maxMembers: 500, features: ['Custom App', 'Adv Reports', 'API Access'], status: 'ACTIVE' },
];

export let mockPlansList = [...MOCK_PLANS];

export const superadminPlansHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: mockPlansList });
  }),
  http.get(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(300);
    const plan = mockPlansList.find(p => p.id === params.id);
    return HttpResponse.json({ success: true, message: 'Success', data: plan });
  }),
  http.post(BASE_URL, async ({ request }) => {
    await delay(500);
    const body = await request.json() as Record<string, unknown>;
    const newPlan = { ...body, id: `p${Date.now()}` };
    mockPlansList = [...mockPlansList, newPlan as unknown as typeof mockPlansList[0]];
    return HttpResponse.json({ success: true, message: 'Created', data: newPlan });
  }),
  http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
    await delay(500);
    const body = await request.json() as Record<string, unknown>;
    mockPlansList = mockPlansList.map(p => p.id === params.id ? { ...p, ...body } : p);
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPlansList.find(p => p.id === params.id) });
  }),
  http.delete(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(400);
    mockPlansList = mockPlansList.filter(p => p.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Deleted' });
  }),
  http.patch(`${BASE_URL}/:id/archive`, async ({ params }) => {
    await delay(400);
    mockPlansList = mockPlansList.map(p => p.id === params.id ? { ...p, status: 'ARCHIVED' } : p);
    return HttpResponse.json({ success: true, message: 'Archived' });
  }),
];
