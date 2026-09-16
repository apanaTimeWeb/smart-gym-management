import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import {
  MOCK_ATTENDANCE_RECORDS,
  MOCK_ATTENDANCE_STATS,
  MOCK_ATTENDANCE_MEMBERS,
} from '@/app/trainer/attendance/attendance_fixtures/TrainerAttendanceMockData';
import { CreateAttendanceDtoSchema } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 500;
const MOCK_SHORT_DELAY_MS = 200;
const MOCK_FAST_DELAY_MS = 300;

let attendanceDB = [...MOCK_ATTENDANCE_RECORDS];

export const trainerAttendanceHandlers = [
  http.get(`${BASE}/trainer/attendance`, async ({ request }) => {
    await delay(MOCK_FAST_DELAY_MS);
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const staffId = url.searchParams.get('staffId');
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const date = url.searchParams.get('date');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    let filtered = [...attendanceDB];
    if (type) filtered = filtered.filter(r => r.type === type);
    if (staffId) filtered = filtered.filter(r => r.staffId === staffId || r.staff?.id === staffId);
    if (search) {
      filtered = filtered.filter(r =>
        r.member?.name?.toLowerCase().includes(search) ||
        r.staff?.name?.toLowerCase().includes(search)
      );
    }
    if (date && date !== 'All Time') {
      const today = new Date();
      filtered = filtered.filter(r => {
        const d = new Date(r.date);
        if (date === 'Today') return d.toDateString() === today.toDateString();
        if (date === 'Yesterday') {
          const yest = new Date(today);
          yest.setDate(yest.getDate() - 1);
          return d.toDateString() === yest.toDateString();
        }
        if (date === 'Last 7 Days') {
          const cutoff = new Date(today);
          cutoff.setDate(cutoff.getDate() - 7);
          return d >= cutoff;
        }
        if (date === 'This Month') {
          return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return HttpResponse.json({ success: true, message: 'Attendance records fetched successfully', data: { attendance: paginated, total: filtered.length, page, limit } });
  }),

  http.get(`${BASE}/trainer/attendance/stats`, async () => {
    await delay(MOCK_SHORT_DELAY_MS);
    return HttpResponse.json({ success: true, message: 'Attendance stats fetched successfully', data: MOCK_ATTENDANCE_STATS });
  }),

  http.get(`${BASE}/trainer/attendance/members-basic`, async () => {
    await delay(MOCK_SHORT_DELAY_MS);
    return HttpResponse.json({ success: true, message: 'Attendance members fetched successfully', data: MOCK_ATTENDANCE_MEMBERS });
  }),

  http.post(`${BASE}/trainer/attendance`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = CreateAttendanceDtoSchema.safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid attendance payload.', data: null });
    const body = parsedBody.data;
    
    // Support self check-in which might only have staffId
    if ((body as any).isSelfCheckIn) {
       return HttpResponse.json({ success: true, message: 'Attendance action completed successfully', data: null });
    }

    const record = {
      id: `att-${Date.now()}`,
      type: body.type,
      date: body.date,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      notes: body.notes,
      memberId: body.memberId,
      staffId: body.staffId,
      member: body.memberId
        ? MOCK_ATTENDANCE_MEMBERS.find(m => m.id === body.memberId)
        : undefined,
      checkInMethod: 'Manual',
    };
    attendanceDB = [record, ...attendanceDB];
    return HttpResponse.json({ success: true, message: 'Attendance record created successfully', data: record });
  }),

  http.patch(`${BASE}/trainer/attendance/checkout/:staffId`, async () => {
    await delay(MOCK_FAST_DELAY_MS);
    return HttpResponse.json({ success: true, message: 'Attendance action completed successfully', data: null });
  })
];
