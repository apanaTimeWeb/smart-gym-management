import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_LIBRARY_DIET_PLANS, MOCK_LIBRARY_ASSIGNED_MEMBERS } from '@/app/trainer/library/library_fixtures/TrainerLibraryMockData';
import { LibraryUrlConfig } from '@/app/trainer/library/library_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
let dietPlansDB = [...MOCK_LIBRARY_DIET_PLANS];
let assignedMembersDB = [...MOCK_LIBRARY_ASSIGNED_MEMBERS];

export const trainerLibraryHandlers = [
  http.get(`${BASE}${LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const goal = url.searchParams.get('goal') ?? 'All';
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '10');
    const filtered = dietPlansDB.filter(plan => (!search || plan.name.toLowerCase().includes(search)) && (goal === 'All' || plan.goal === goal));
    return HttpResponse.json({ success: true, message: 'Diet plans loaded.', data: { dietPlans: filtered.slice((page - 1) * limit, page * limit), total: filtered.length } });
  }),
  http.get(`${BASE}${LibraryUrlConfig.BACKEND_API.ASSIGNED_MEMBERS}`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Assigned members loaded.', data: assignedMembersDB });
  }),
  http.patch(`${BASE}${LibraryUrlConfig.BACKEND_API.ASSIGN_DIET(':memberId')}`, async ({ params, request }) => {
    await delay(400);
    const memberIndex = assignedMembersDB.findIndex(member => member.id === params.memberId);
    if (memberIndex === -1) return HttpResponse.json({ success: false, message: 'Member not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    const body = await request.json() as { dietPlanId?: unknown };
    if (typeof body.dietPlanId !== 'string' || !dietPlansDB.some(plan => plan.id === body.dietPlanId)) {
      return HttpResponse.json({ success: false, message: 'Diet plan not found.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    }
    assignedMembersDB[memberIndex] = { ...assignedMembersDB[memberIndex]!, assignedDietPlanId: body.dietPlanId };
    return HttpResponse.json({ success: true, message: 'Diet plan assigned.', data: { ...assignedMembersDB[memberIndex]! } });
  }),
];
