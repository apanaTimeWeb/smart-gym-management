import { http, HttpResponse, delay } from 'msw';
import { MOCK_GYMS, MOCK_GYM_STATS } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsMockFixtures';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';

let mockGymsList = [...MOCK_GYMS];

export const superadminGymsHandlers = [
  http.get(GymsUrlConfig.BACKEND_API.BASE, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '20');
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockGymsList.slice(start, end);

    return HttpResponse.json({ 
      success: true, 
      message: 'Success', 
      data: paginatedData,
      meta: { total: mockGymsList.length, page, limit, totalPages: Math.ceil(mockGymsList.length / limit) }
    });
  }),
  http.post(GymsUrlConfig.BACKEND_API.BASE, async ({ request }) => {
    await delay(500);
    const body = await request.json() as Record<string, any>;
    const newGym = { ...body, id: `t${Date.now()}`, createdAt: new Date().toISOString() };
    mockGymsList = [newGym as any, ...mockGymsList];
    return HttpResponse.json({ success: true, message: 'Created', data: newGym });
  }),
  http.patch(`${GymsUrlConfig.BACKEND_API.BASE}/:id`, async ({ params, request }) => {
    await delay(500);
    const body = await request.json() as Record<string, any>;
    mockGymsList = mockGymsList.map(g => g.id === params.id ? { ...g, ...body } : g);
    return HttpResponse.json({ success: true, message: 'Updated', data: mockGymsList.find(g => g.id === params.id) });
  }),
  http.delete(`${GymsUrlConfig.BACKEND_API.BASE}/:id`, async ({ params }) => {
    await delay(400);
    mockGymsList = mockGymsList.filter(g => g.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Deleted' });
  }),
  http.patch(`${GymsUrlConfig.BACKEND_API.BASE}/:id/status`, async ({ params, request }) => {
    await delay(300);
    const { status } = await request.json() as Record<string, any>;
    mockGymsList = mockGymsList.map(g => g.id === params.id ? { ...g, status } : g);
    return HttpResponse.json({ success: true, message: 'Status updated', data: mockGymsList.find(g => g.id === params.id) });
  }),
  http.get(`${GymsUrlConfig.BACKEND_API.BASE}/stats`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_GYM_STATS });
  }),
  http.get(`${GymsUrlConfig.BACKEND_API.BASE}/:id`, async ({ params }) => {
    await delay(300);
    const gym = mockGymsList.find(g => g.id === params.id);
    return HttpResponse.json({ success: true, message: 'Success', data: gym });
  }),
  http.post(`${GymsUrlConfig.BACKEND_API.IMPERSONATE}/:id/impersonate`, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Impersonating', data: { token: 'mock-jwt-token' } });
  }),
];
