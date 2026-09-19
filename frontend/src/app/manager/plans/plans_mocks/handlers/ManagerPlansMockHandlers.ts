import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_infrastructure/ManagerHttpStatus';
import { MOCK_PLANS } from '@/app/manager/plans/plans_fixtures/ManagerPlansMockData';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import { MOCK_PLANS_MEMBERSHIP_OVERVIEW } from '@/app/manager/plans/plans_fixtures/ManagerPlansMembershipMockData';

let mockPlans = [...MOCK_PLANS];

let mockChangeRequestIdCounter = 1000;
let mockPlanIdCounter = 1000;
export const managerPlansHandlers = [
  http.get(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_OVERVIEW), () =>
    HttpResponse.json({ success: true, message: 'Membership overview fetched', data: MOCK_PLANS_MEMBERSHIP_OVERVIEW })
  ),
  http.post(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_ACTIVATE), async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Membership activated successfully', data: {} });
  }),
  http.post(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_RENEW), async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Membership renewed successfully', data: {} });
  }),
  http.post(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.MEMBERSHIP_FREEZE), async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Membership freeze applied successfully', data: {} });
  }),
  http.post(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.CHANGE_REQUESTS), async ({ request }) => {
    await request.json();
    return HttpResponse.json({ success: true, message: 'Plan change request submitted', data: { requestId: `change-${mockChangeRequestIdCounter++}`, status: 'PENDING' } });
  }),

  http.get(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const tier = (url.searchParams.get('tier') || '').trim();
    const status = (url.searchParams.get('status') || '').trim().toUpperCase();
    const filtered = mockPlans.filter((plan) => {
      const matchesSearch = !search || plan.name.toLowerCase().includes(search) || plan.tier.toLowerCase().includes(search);
      const matchesTier = !tier || tier === 'ALL' || plan.tier === tier;
      const matchesStatus = !status || status === 'ALL' || (status === 'ACTIVE' ? plan.isActive : !plan.isActive);
      return matchesSearch && matchesTier && matchesStatus;
    });
    return HttpResponse.json({ success: true, message: 'Success', data: { plans: filtered, total: filtered.length } });
  }),

  http.get(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    const plan = mockPlans.find(p => p.id === params.id) || mockPlans[0];
    return HttpResponse.json({ success: true, message: 'Success', data: plan });
  }),

  http.post(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const body = await request.json() as Partial<Plan>;
    const newPlan = { ...mockPlans[0], ...body, id: `plan-${mockPlanIdCounter++}` } as Plan;
    mockPlans = [newPlan, ...mockPlans];
    return HttpResponse.json({ success: true, message: 'Created', data: newPlan });
  }),

  http.patch(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Plan>;
    const idx = mockPlans.findIndex(p => p.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPlans[idx] = { ...mockPlans[idx], ...body } as Plan;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPlans[idx] });
  }),

  http.delete(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    mockPlans = mockPlans.filter(p => p.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),
];
