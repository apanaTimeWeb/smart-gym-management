import { http, HttpResponse } from 'msw';
import { MOCK_ATTENDANCE_RECORDS, MOCK_ATTENDANCE_STATS } from '@/app/manager/attendance/attendance_fixtures/ManagerAttendanceMockData';
import type { Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';

let mockRecords = [...MOCK_ATTENDANCE_RECORDS];

const ATTENDANCE_LIMIT = 10;

export const managerAttendanceHandlers = [
  http.get(`/api/v1/manager/attendance`, ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const date = url.searchParams.get('date') || '';
    const status = (url.searchParams.get('status') || '').trim().toLowerCase();
    const type = url.searchParams.get('type') || '';
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || String(ATTENDANCE_LIMIT)), 1);

    const filtered = mockRecords.filter((record) => {
      const name = record.member?.name || record.staff?.name || '';
      const matchesSearch = !search || name.toLowerCase().includes(search);
      const matchesDate = !date || record.date === date;
      const matchesStatus = !status || (record.status || '').toLowerCase() === status;
      const matchesType = !type || record.type === type;
      return matchesSearch && matchesDate && matchesStatus && matchesType;
    });

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return HttpResponse.json({
      success: true,
      message: 'Fetched attendance records',
      data: { attendances: paginated, total: filtered.length, page, limit },
    });
  }),

  http.get(`/api/v1/manager/attendance/stats`, () => {
    return HttpResponse.json({ success: true, message: 'Fetched stats', data: MOCK_ATTENDANCE_STATS });
  }),

  http.get(`/api/v1/manager/attendance/history`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const type = url.searchParams.get('type');
    const filtered = mockRecords.filter(r => r.type === type && (type === 'MEMBER' ? String(r.memberId) === userId : String(r.staffId) === userId));
    return HttpResponse.json({ success: true, message: 'Fetched history', data: filtered });
  }),

  http.get(`/api/v1/manager/attendance/members`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'active';
    const members = Array.from(new Map(mockRecords.filter(r => r.member).map(r => [String(r.memberId), r.member?.name || ''])).entries())
      .map(([id, name]) => ({ id, name, status }));
    return HttpResponse.json({ success: true, message: 'Fetched active members', data: { members } });
  }),

  http.get(`/api/v1/manager/attendance/staff`, () => {
    const names = Array.from(new Map(mockRecords.filter(r => r.staff).map(r => [String(r.staffId), r.staff?.name || ''])).entries());
    const staff = names.map(([id, name]) => ({ id, name }));
    return HttpResponse.json({ success: true, message: 'Fetched staff', data: { staff } });
  }),

  http.post(`/api/v1/manager/attendance`, async ({ request }) => {
    const body = await request.json() as { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string };
    const newRecord: Attendance = {
      id: `att-${Date.now()}`,
      memberId: body.memberId ? parseInt(body.memberId, 10) : undefined,
      staffId: body.staffId ? parseInt(body.staffId, 10) : undefined,
      date: body.date,
      checkIn: body.checkIn || '09:00 AM',
      type: body.type as 'MEMBER' | 'STAFF',
      status: 'Present',
    };
    mockRecords = [newRecord, ...mockRecords];
    return HttpResponse.json({ success: true, message: 'Attendance marked', data: newRecord });
  }),
];
