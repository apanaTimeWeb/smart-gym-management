import { http, HttpResponse, delay } from 'msw';
import { MOCK_GYMS, MOCK_GYM_STATS, MOCK_SUBSCRIPTION_PLANS } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsMockFixtures';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { gymCreateSchema, gymProvisionSchema } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsSchema';
import { StatusCodes } from 'http-status-codes';
let mockGymsList = [...MOCK_GYMS];
export function resetSuperadminGymsMockState(): void { mockGymsList = [...MOCK_GYMS]; }
export const superadminGymsHandlers = [
    http.get(GymsUrlConfig.BACKEND_API.SUBSCRIPTION_PLANS, async () => {
        await delay(300);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUBSCRIPTION_PLANS });
    }),
    http.get(GymsUrlConfig.BACKEND_API.BASE, async ({ request }) => {
        try {
            console.log('Handler hit!');
            await delay(400);
        const url = new URL(request.url);
        const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
        const limit = Math.max(Number(url.searchParams.get('limit') || '20'), 1);
        const search = (url.searchParams.get('search') || '').trim().toLowerCase();
        const status = url.searchParams.get('status') || '';
        const plan = url.searchParams.get('plan') || '';
        const sortBy = url.searchParams.get('sortBy') || 'createdAt';
        const segmentId = url.searchParams.get('segmentId') || '';
        const segmentIndex = segmentId ? Number(segmentId.replace(/\D/g, '')) : 0;
        const matchesSegment = (gymId: string, index: number) => {
            if (!segmentId) return true;
            if (['t1', 't2', 't3'].includes(gymId)) {
                const legacyMembership: Record<string, string[]> = { seg1: ['t1', 't3'], seg2: ['t2'], seg3: ['t2', 't3'], seg4: ['t1', 't3'] };
                return legacyMembership[segmentId]?.includes(gymId) ?? false;
            }
            return segmentIndex > 0 && ((index + segmentIndex) % 4 === 0);
        };
        const order = url.searchParams.get('order') === 'asc' ? 'asc' : 'desc';
        let rows = mockGymsList.filter((gym) => {
            const matchesSearch = !search || [gym.id, gym.name, gym.ownerName, gym.adminEmail, gym.city || '', gym.state || ''].some((value) => value.toLowerCase().includes(search));
            const matchesStatus = !status || status === 'All' || gym.status === status;
            const matchesPlan = !plan || plan === 'All' || gym.plan === plan;
            const matchesSegmentRow = matchesSegment(gym.id, mockGymsList.indexOf(gym));
            return matchesSearch && matchesStatus && matchesPlan && matchesSegmentRow;
        });
        rows.sort((a,b) => { const av = a[sortBy as keyof typeof a]; const bv = b[sortBy as keyof typeof b]; const left=String(av ?? ''); const right=String(bv ?? ''); const cmp=left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }); return order === 'asc' ? cmp : -cmp; });
        const total = rows.length;
        const start = (page - 1) * limit;
        const paginatedData = rows.slice(start, start + limit);
        return HttpResponse.json({ success: true, message: 'Success', data: paginatedData, meta: { total, page, limit, totalPages: Math.max(Math.ceil(total / limit), 1) } });
        } catch (e) {
            console.error('MSW GET /api/gyms ERROR:', e);
            throw e;
        }
    }),
    http.post(`${GymsUrlConfig.BACKEND_API.BASE}/provision`, async ({ request }) => {
        await delay(700);
        const parsed = gymProvisionSchema.safeParse(await request.json());
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Gym provisioning payload is invalid.', data: null }, { status: StatusCodes.BAD_REQUEST });
        const body = parsed.data;
        const gymName = body.gymName;
        const planName = String(body.planId ?? body.plan ?? 'Starter');
        const newGym = { id: `t${Date.now()}`, name: gymName, ownerName: String(body.ownerName ?? 'Tenant Owner'), adminEmail: String(body.adminEmail ?? 'admin@example.com'), phone: String(body.phone ?? ''), status: 'ACTIVE' as const, plan: planName, createdAt: new Date().toISOString(), memberCount: 0, monthlyRevenue: 0, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: '', state: '', country: 'India', staffCount: 1, lastActiveAt: new Date().toISOString() };
        mockGymsList = [newGym, ...mockGymsList];
        return HttpResponse.json({ success: true, message: 'Gym provisioned successfully.', data: newGym });
    }),
    http.post(GymsUrlConfig.BACKEND_API.BASE, async ({ request }) => {
        await delay(500);
        const parsed = gymCreateSchema.safeParse(await request.json());
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Gym creation payload is invalid.', data: null }, { status: StatusCodes.BAD_REQUEST });
        const newGym = { ...parsed.data, id: `t${Date.now()}`, createdAt: new Date().toISOString(), status: 'ACTIVE' as const, memberCount: 0, monthlyRevenue: 0, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', lastActiveAt: new Date().toISOString() };
        mockGymsList = [newGym as typeof mockGymsList[0], ...mockGymsList];
        return HttpResponse.json({ success: true, message: 'Created', data: newGym });
    }),
    http.patch(`${GymsUrlConfig.BACKEND_API.BASE}/:id`, async ({ params, request }) => {
        await delay(500);
        const body = await request.json() as Record<string, unknown>;
        const exists = mockGymsList.some(g => g.id === params.id);
        if (!exists) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null }, { status: StatusCodes.NOT_FOUND });
        mockGymsList = mockGymsList.map(g => g.id === params.id ? { ...g, ...body } : g);
        return HttpResponse.json({ success: true, message: 'Updated', data: mockGymsList.find(g => g.id === params.id) });
    }),
    http.delete(`${GymsUrlConfig.BACKEND_API.BASE}/:id`, async ({ params }) => {
        await delay(400);
        const exists = mockGymsList.some(g => g.id === params.id);
        if (!exists) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null }, { status: StatusCodes.NOT_FOUND });
        mockGymsList = mockGymsList.filter(g => g.id !== params.id);
        return HttpResponse.json({ success: true, message: 'Deleted' });
    }),
    http.patch(`${GymsUrlConfig.BACKEND_API.BASE}/:id/status`, async ({ params, request }) => {
        await delay(300);
        const { status } = await request.json() as Record<string, unknown>;
        const validStatus = status as 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';
        const exists = mockGymsList.some(g => g.id === params.id);
        if (!exists) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null }, { status: StatusCodes.NOT_FOUND });
        mockGymsList = mockGymsList.map(g => g.id === params.id ? { ...g, status: validStatus } : g);
        return HttpResponse.json({ success: true, message: 'Status updated', data: mockGymsList.find(g => g.id === params.id) });
    }),
    http.get(`${GymsUrlConfig.BACKEND_API.BASE}/stats`, async () => {
        await delay(200);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_GYM_STATS });
    }),
    http.get(`${GymsUrlConfig.BACKEND_API.BASE}/:id`, async ({ params }) => {
        await delay(300);
        const gym = mockGymsList.find(g => g.id === params.id);
        if (!gym) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null }, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json({ success: true, message: 'Success', data: gym });
    }),
    http.post(`${GymsUrlConfig.BACKEND_API.IMPERSONATE}/:id/impersonate`, async () => {
        await delay(400);
        return HttpResponse.json({ success: true, message: 'Impersonating', data: { token: 'mock-jwt-token' } });
    }),
];
