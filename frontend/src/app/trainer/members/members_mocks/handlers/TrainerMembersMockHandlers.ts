import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_MEMBERS, MOCK_MEMBER_STATS } from '@/app/trainer/members/members_fixtures/TrainerMembersMockData';
import { MemberSchema } from '@/app/trainer/members/members_types/TrainerMembers.schema';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 500;
const MOCK_SHORT_DELAY_MS = 200;
const MOCK_FAST_DELAY_MS = 300;

let membersDB = [...MOCK_MEMBERS];

export const trainerMembersHandlers = [
  http.get(`${BASE}/trainer/members`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || 'All';
    const progressStatus = url.searchParams.get('progressStatus') || 'All';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);

    let filtered = [...membersDB];
    if (search) {
      filtered = filtered.filter(m => m.name.toLowerCase().includes(search) || m.email?.toLowerCase().includes(search));
    }
    if (status !== 'All') {
      filtered = filtered.filter(m => m.status === status);
    }
    if (progressStatus !== 'All') {
      filtered = filtered.filter(m => m.progressStatus === progressStatus);
    }

    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return HttpResponse.json({
      success: true,
      message: 'Members fetched successfully',
      data: {
        members: paginated,
        total: filtered.length,
        page,
        limit
      }
    });
  }),

  http.get(`${BASE}/trainer/members/stats`, async () => {
    await delay(MOCK_DELAY_MS);
    return HttpResponse.json({
      success: true,
      message: 'Stats fetched successfully',
      data: MOCK_MEMBER_STATS
    });
  }),

  http.get(`${BASE}/trainer/members/:id`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const member = membersDB.find(m => m.id === params.id);
    if (!member) {
      return HttpResponse.json({ success: false, message: 'Member not found' }, { status: StatusCodes.NOT_FOUND });
    }
    return HttpResponse.json({
      success: true,
      message: 'Member fetched successfully',
      data: member
    });
  }),

  http.patch(`${BASE}/trainer/members/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = MemberSchema.partial().safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid member payload.', data: null });
    const body = parsedBody.data;
    const idx = membersDB.findIndex(m => m.id === params.id);
    if (idx === -1) {
      return HttpResponse.json({ success: false, message: 'Member not found' }, { status: StatusCodes.NOT_FOUND });
    }
    
    membersDB[idx] = { ...membersDB[idx], ...body } as typeof membersDB[0];
    return HttpResponse.json({
      success: true,
      message: 'Member updated successfully',
      data: membersDB[idx]
    });
  }),
  
  http.get(`${BASE}/trainer/members/:id/attendance`, async ({ params }) => {
    await delay(MOCK_FAST_DELAY_MS);
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const mockData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      let status = 'P';
      if (day % 7 === 0) status = 'L'; // rest day
      else if (day % 10 === 0) status = 'A'; // random absent
      return { day, status };
    });
    
    return HttpResponse.json({
      success: true,
      message: 'Attendance fetched',
      data: mockData
    });
  }),
];
