import { http, HttpResponse, delay } from 'msw';
import type { SubscriptionPlan } from '@/app/superadmin/plans/superadmin_plans_types/superadmin_plans_types';
import { INITIAL_PLANS } from '@/app/superadmin/plans/plans_mocks/fixtures/SuperadminPlansMockFixtures';
const BASE_URL = '*/superadmin/plans';
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
            : HttpResponse.json({ success: false, message: 'Plan not found', data: null }, { status: 404 });
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
        if (!current)
            return HttpResponse.json({ success: false, message: 'Plan not found', data: null }, { status: 404 });
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
        if (!updated)
            return HttpResponse.json({ success: false, message: 'Plan not found', data: null }, { status: 404 });
        mockPlansList = mockPlansList.map((item) => item.id === params.id ? { ...item, isArchived: true } : item);
        return HttpResponse.json({ success: true, message: 'Archived', data: { ...updated, isArchived: true } });
    }),
];
