import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_utils/ManagerHttpStatus';
import { MOCK_PLANS } from '@/app/manager/plans/plans_fixtures/ManagerPlansMockData';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import { MOCK_PLANS_MEMBERSHIP_OVERVIEW } from '@/app/manager/plans/plans_fixtures/ManagerPlansMembershipMockData';

let mockPlans = [...MOCK_PLANS];

export const managerPlansHandlers = [
  http.get('http://localhost:5000/api/v1/manager/plans/membership-overview', () =>
    HttpResponse.json({ success: true, message: 'Membership overview fetched', data: MOCK_PLANS_MEMBERSHIP_OVERVIEW })
  ),
  http.post('http://localhost:5000/api/v1/manager/plans/membership-activate', async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Membership activated successfully', data: {} });
  }),
  http.post('http://localhost:5000/api/v1/manager/plans/membership-renew', async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Membership renewed successfully', data: {} });
  }),
  http.post('http://localhost:5000/api/v1/manager/plans/membership-freeze', async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Membership freeze applied successfully', data: {} });
  }),
  http.post('http://localhost:5000/api/v1/manager/plans/change-requests', async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Plan change request submitted', data: { requestId: `change-${Date.now()}`, status: 'PENDING' } });
  }),

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
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPlans[idx] = { ...mockPlans[idx], ...body } as Plan;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPlans[idx] });
  }),

  http.delete('http://localhost:5000/api/v1/manager/plans/:id', ({ params }) => {
    mockPlans = mockPlans.filter(p => p.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),
];
