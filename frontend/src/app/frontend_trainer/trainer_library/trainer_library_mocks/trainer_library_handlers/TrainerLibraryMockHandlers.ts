
import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_LIBRARY_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_library/trainer_library_constants/TrainerLibraryHttpStatusCodes';

import { TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS, TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS } from '@/app/frontend_trainer/trainer_library/trainer_library_mocks/trainer_library_fixtures/TrainerLibraryMockData';

import { TRAINER_LIBRARY_URLS } from '@/app/frontend_trainer/trainer_library/trainer_library_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
let dietPlansDB = [...TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS];
let assignedMembersDB = [...TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS];

export const TrainerLibraryMockHandlers = [
  http.get(`${BASE}${TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE}`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const goal = url.searchParams.get('goal') ?? 'All';
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '10');
    const filtered = dietPlansDB.filter(plan => (!search || plan.name.toLowerCase().includes(search)) && (goal === 'All' || plan.goal === goal));
    return HttpResponse.json({ success: true, message: 'Diet plans loaded.', data: { dietPlans: filtered.slice((page - 1) * limit, page * limit), total: filtered.length } });
  }),
  http.get(`${BASE}${TRAINER_LIBRARY_URLS.API.ASSIGNED_MEMBERS}`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Assigned members loaded.', data: assignedMembersDB });
  }),
  http.patch(`${BASE}${TRAINER_LIBRARY_URLS.API.ASSIGN_DIET(':memberId')}`, async ({ params, request }) => {
    await delay(400);
    const memberIndex = assignedMembersDB.findIndex(member => member.id === params.memberId);
    if (memberIndex === -1) return HttpResponse.json({ success: false, message: 'Member not found.', data: null }, { status: TRAINER_LIBRARY_HTTP_STATUS_CODES.NOT_FOUND });
    const body = await request.json() as { dietPlanId?: unknown };
    if (typeof body.dietPlanId !== 'string' || !dietPlansDB.some(plan => plan.id === body.dietPlanId)) {
      return HttpResponse.json({ success: false, message: 'Diet plan not found.', data: null }, { status: TRAINER_LIBRARY_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    }
    assignedMembersDB[memberIndex] = { ...assignedMembersDB[memberIndex]!, assignedDietPlanId: body.dietPlanId };
    return HttpResponse.json({ success: true, message: 'Diet plan assigned.', data: { ...assignedMembersDB[memberIndex]! } });
  }),
];
