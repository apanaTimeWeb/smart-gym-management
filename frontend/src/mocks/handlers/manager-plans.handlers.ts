import { http, HttpResponse } from 'msw';
import { MOCK_PLANS } from '@/app/manager/plans/plans_fixtures/ManagerPlansMockData';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';

let mockPlans = [...MOCK_PLANS];

export const managerPlansHandlers = [
  http.get('http://localhost:5000/api/v1/manager/plans', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: mockPlans });
  }),

  http.get('http://localhost:5000/api/v1/manager/plans/:id', ({ params }) => {
    const plan = mockPlans.find(p => p.id === params.id) || mockPlans[0];
    return HttpResponse.json({ success: true, message: 'Success', data: plan });
  }),

  http.post('http://localhost:5000/api/v1/manager/plans', async ({ request }) => {
    const body = await request.json() as Partial<Plan>;
    const newPlan = { ...mockPlans[0], ...body, id: `plan-${Date.now()}` } as Plan;
    mockPlans = [newPlan, ...mockPlans];
    return HttpResponse.json({ success: true, message: 'Created', data: newPlan });
  }),

  http.patch('http://localhost:5000/api/v1/manager/plans/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<Plan>;
    const idx = mockPlans.findIndex(p => p.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    mockPlans[idx] = { ...mockPlans[idx], ...body } as Plan;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPlans[idx] });
  }),

  http.delete('http://localhost:5000/api/v1/manager/plans/:id', ({ params }) => {
    mockPlans = mockPlans.filter(p => p.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),
];
