import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_ATTENDANCE_RECORDS, MOCK_ATTENDANCE_STATS, MOCK_ATTENDANCE_MEMBERS } from '@/app/trainer/attendance/attendance_fixtures/TrainerAttendanceMockData';
import { CreateAttendanceDtoSchema } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';
import { AttendanceUrlConfig } from '@/app/trainer/attendance/attendance_url_config';
const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 400; const MOCK_SHORT_DELAY_MS = 200; const MOCK_FAST_DELAY_MS = 250;
let attendanceDB = [...MOCK_ATTENDANCE_RECORDS];
const todayIsoDate = () => new Date().toISOString().slice(0, 10);
export const trainerAttendanceHandlers = [
  http.get(`${BASE}${AttendanceUrlConfig.BACKEND_API.BASE}`, async ({ request }) => {
    await delay(MOCK_FAST_DELAY_MS); const url = new URL(request.url); const type = url.searchParams.get('type'); const staffId = url.searchParams.get('staffId'); const search = url.searchParams.get('search')?.toLowerCase() || ''; const date = url.searchParams.get('date'); const page = Number(url.searchParams.get('page') || '1'); const limit = Number(url.searchParams.get('limit') || '10');
    let filtered = [...attendanceDB];
    if (type) filtered = filtered.filter(r => r.type === type);
    if (staffId) filtered = filtered.filter(r => r.staffId === staffId || r.staff?.id === staffId);
    if (search) filtered = filtered.filter(r => r.member?.name?.toLowerCase().includes(search) || r.staff?.name?.toLowerCase().includes(search));
    if (date && date !== 'All Time') { const today = new Date(); filtered = filtered.filter(r => { const d = new Date(r.date); if (date === 'Today') return d.toDateString() === today.toDateString(); if (date === 'Yesterday') { const y = new Date(today); y.setDate(y.getDate()-1); return d.toDateString() === y.toDateString(); } if (date === 'Last 7 Days') { const cutoff = new Date(today); cutoff.setDate(cutoff.getDate()-7); return d >= cutoff; } if (date === 'This Month') return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(); return true; }); }
    const start = (page-1)*limit; return HttpResponse.json({ success: true, message: 'Attendance records fetched successfully', data: { attendance: filtered.slice(start,start+limit), total: filtered.length, page, limit } });
  }),
  http.get(`${BASE}${AttendanceUrlConfig.BACKEND_API.STATS}`, async () => { await delay(MOCK_SHORT_DELAY_MS); return HttpResponse.json({ success: true, message: 'Attendance stats fetched successfully', data: MOCK_ATTENDANCE_STATS }); }),
  http.get(`${BASE}${AttendanceUrlConfig.BACKEND_API.MEMBERS_BASIC}`, async () => { await delay(MOCK_SHORT_DELAY_MS); return HttpResponse.json({ success: true, message: 'Attendance members fetched successfully', data: MOCK_ATTENDANCE_MEMBERS }); }),
  http.post(`${BASE}${AttendanceUrlConfig.BACKEND_API.BASE}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS); const parsedBody = CreateAttendanceDtoSchema.safeParse(await request.json()); if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid attendance payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY }); const body = parsedBody.data;
    if (body.isSelfCheckIn) {
      const staffId = body.staffId; const open = attendanceDB.find(r => r.staffId === staffId && r.type === 'STAFF' && !r.checkOut);
      if (open) return HttpResponse.json({ success: false, message: 'You are already checked in.', data: null }, { status: StatusCodes.CONFLICT });
      const staff = MOCK_ATTENDANCE_MEMBERS.find(m => m.id === staffId);
      const record = { id: `att-${Date.now()}`, type: 'STAFF' as const, date: todayIsoDate(), checkIn: new Date().toISOString(), staffId, staff, checkInMethod: 'Self' as const };
      attendanceDB = [record, ...attendanceDB];
      return HttpResponse.json({ success: true, message: 'Check-in recorded.', data: null });
    }
    const record = { id: `att-${Date.now()}`, type: body.type, date: body.date, checkIn: body.checkIn, checkOut: body.checkOut, notes: body.notes, memberId: body.memberId, staffId: body.staffId, member: body.memberId ? MOCK_ATTENDANCE_MEMBERS.find(m => m.id === body.memberId) : undefined, checkInMethod: 'Manual' as const };
    attendanceDB = [record, ...attendanceDB]; return HttpResponse.json({ success: true, message: 'Attendance record created successfully', data: record });
  }),
  http.patch(`${BASE}${AttendanceUrlConfig.BACKEND_API.CHECKOUT(':staffId')}`, async ({ params, request }) => {
    await delay(MOCK_FAST_DELAY_MS); const index = attendanceDB.findIndex(r => r.staffId === params.staffId && r.type === 'STAFF' && !r.checkOut); if (index === -1) return HttpResponse.json({ success: false, message: 'No open attendance found.', data: null }, { status: StatusCodes.NOT_FOUND }); const body = await request.json() as { checkOutTime?: unknown }; const checkOut = typeof body.checkOutTime === 'string' ? body.checkOutTime : new Date().toISOString(); attendanceDB[index] = { ...attendanceDB[index]!, checkOut }; return HttpResponse.json({ success: true, message: 'Check-out recorded.', data: null });
  }),
];
