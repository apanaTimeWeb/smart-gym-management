import { http, HttpResponse, delay } from 'msw';
import { MOCK_GYMS, MOCK_GYM_STATS } from '@/app/superadmin/gyms/superadmin_gyms_api/SuperadminGymsMockData';
import { SuperadminGymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';

let mockGymsList = [...MOCK_GYMS];

export const superadminGymsHandlers = [
  http.get(SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: mockGymsList });
  }),
  http.post(SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE, async ({ request }) => {
    await delay(500);
    const body = await request.json() as any;
    const newGym = { ...body, id: `t${Date.now()}`, createdAt: new Date().toISOString() };
    mockGymsList = [newGym, ...mockGymsList];
    return HttpResponse.json({ success: true, message: 'Created', data: newGym });
  }),
  http.patch(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/:id`, async ({ params, request }) => {
    await delay(500);
    const body = await request.json() as any;
    mockGymsList = mockGymsList.map(g => g.id === params.id ? { ...g, ...body } : g);
    return HttpResponse.json({ success: true, message: 'Updated', data: mockGymsList.find(g => g.id === params.id) });
  }),
  http.delete(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/:id`, async ({ params }) => {
    await delay(400);
    mockGymsList = mockGymsList.filter(g => g.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Deleted' });
  }),
  http.patch(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/:id/status`, async ({ params, request }) => {
    await delay(300);
    const { status } = await request.json() as any;
    mockGymsList = mockGymsList.map(g => g.id === params.id ? { ...g, status } : g);
    return HttpResponse.json({ success: true, message: 'Status updated', data: mockGymsList.find(g => g.id === params.id) });
  }),
  http.get(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/stats`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_GYM_STATS });
  }),
  http.get(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/:id`, async ({ params }) => {
    await delay(300);
    const gym = mockGymsList.find(g => g.id === params.id);
    return HttpResponse.json({ success: true, message: 'Success', data: gym });
  }),
  http.post(`${SuperadminGymsUrlConfig.BACKEND_API.IMPERSONATE_BASE}/:id/impersonate`, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Impersonating', data: { token: 'mock-jwt-token' } });
  }),
];
