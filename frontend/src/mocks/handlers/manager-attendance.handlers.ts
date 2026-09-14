import { http, HttpResponse } from 'msw';
import { MOCK_ATTENDANCE_RECORDS, MOCK_ATTENDANCE_STATS } from '@/app/manager/attendance/attendance_api/ManagerAttendanceMockData';
import type { Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';

let mockRecords = [...MOCK_ATTENDANCE_RECORDS];

export const managerAttendanceHandlers = [
  http.get('http://localhost:5000/api/v1/manager/attendance', () => {
    return HttpResponse.json({ success: true, message: 'Fetched attendance records', data: { attendances: mockRecords, total: mockRecords.length } });
  }),

  http.get('http://localhost:5000/api/v1/manager/attendance/stats', () => {
    return HttpResponse.json({ success: true, message: 'Fetched stats', data: MOCK_ATTENDANCE_STATS });
  }),

  http.get('http://localhost:5000/api/v1/manager/attendance/history', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const type = url.searchParams.get('type');
    const filtered = mockRecords.filter(r => r.type === type && (type === 'MEMBER' ? String(r.memberId) === userId : String(r.staffId) === userId));
    return HttpResponse.json({ success: true, message: 'Fetched history', data: filtered });
  }),

  http.post('http://localhost:5000/api/v1/manager/attendance', async ({ request }) => {
    const body = await request.json() as { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string };
    const newRecord: Attendance = {
      id: `att-${Date.now()}`,
      memberId: body.memberId ? parseInt(body.memberId, 10) : undefined,
      staffId: body.staffId ? parseInt(body.staffId, 10) : undefined,
      date: body.date,
      checkIn: body.checkIn || '09:00 AM',
      type: body.type as 'MEMBER' | 'STAFF'
    };
    mockRecords = [newRecord, ...mockRecords];
    return HttpResponse.json({ success: true, message: 'Attendance marked', data: newRecord });
  }),
];
