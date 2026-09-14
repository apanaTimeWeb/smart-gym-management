import { http, HttpResponse, delay } from 'msw';
import { SuperadminPlansUrlConfig } from '@/app/superadmin/plans/superadmin_plans_url_config';

const MOCK_PLANS = [
  { id: '1', name: 'Starter Plan', basePrice: 49.99, billingCycle: 'MONTHLY', maxMembers: 100, features: ['Core App', 'Basic Reports'], status: 'ACTIVE' },
  { id: '2', name: 'Pro Plan', basePrice: 99.99, billingCycle: 'MONTHLY', maxMembers: 500, features: ['Custom App', 'Adv Reports', 'API Access'], status: 'ACTIVE' },
];

let mockPlansList = [...MOCK_PLANS];

export const superadminPlansHandlers = [
  http.get(SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: mockPlansList });
  }),
  http.get(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/:id`, async ({ params }) => {
    await delay(300);
    const plan = mockPlansList.find(p => p.id === params.id);
    return HttpResponse.json({ success: true, message: 'Success', data: plan });
  }),
  http.post(SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE, async ({ request }) => {
    await delay(500);
    const body = await request.json() as any;
    const newPlan = { ...body, id: `p${Date.now()}` };
    mockPlansList = [...mockPlansList, newPlan];
    return HttpResponse.json({ success: true, message: 'Created', data: newPlan });
  }),
  http.patch(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/:id`, async ({ params, request }) => {
    await delay(500);
    const body = await request.json() as any;
    mockPlansList = mockPlansList.map(p => p.id === params.id ? { ...p, ...body } : p);
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPlansList.find(p => p.id === params.id) });
  }),
  http.delete(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/:id`, async ({ params }) => {
    await delay(400);
    mockPlansList = mockPlansList.filter(p => p.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Deleted' });
  }),
  http.patch(`${SuperadminPlansUrlConfig.BACKEND_API.PLANS_BASE}/:id/archive`, async ({ params }) => {
    await delay(400);
    mockPlansList = mockPlansList.map(p => p.id === params.id ? { ...p, status: 'ARCHIVED' } : p);
    return HttpResponse.json({ success: true, message: 'Archived' });
  }),
];
