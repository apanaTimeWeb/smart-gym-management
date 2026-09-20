import { http, HttpResponse } from 'msw';
import { MOCK_ATTENDANCE_RECORDS, MOCK_ATTENDANCE_STATS } from '@/app/manager/attendance/attendance_fixtures/ManagerAttendanceMockData';
import { MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS, MANAGER_ATTENDANCE_STAFF_SNAPSHOTS } from '@/app/manager/attendance/attendance_fixtures/ManagerAttendanceQrMockData';
import { ManagerAttendanceUrlConfig } from '@/app/manager/attendance/attendance_url_config';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import type { Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';


let mockRecords = [...MOCK_ATTENDANCE_RECORDS];
let mockAttendanceIdCounter = 100;

const ATTENDANCE_LIMIT = 10;

export function resetManagerAttendanceMockState(): void {
  mockRecords = [...MOCK_ATTENDANCE_RECORDS];
  mockAttendanceIdCounter = 100;
}

export const managerAttendanceHandlers = [
  http.get(managerMockApiUrl(ManagerAttendanceUrlConfig.BACKEND_API.BASE), ({ request }) => {
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
      data: { attendances: paginated, total: filtered.length, page, limit } });
  }),

  http.get(managerMockApiUrl(ManagerAttendanceUrlConfig.BACKEND_API.STATS), () => {
    return HttpResponse.json({ success: true, message: 'Fetched stats', data: MOCK_ATTENDANCE_STATS });
  }),

  http.get(managerMockApiUrl(ManagerAttendanceUrlConfig.BACKEND_API.HISTORY), ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const type = url.searchParams.get('type');
    const filtered = mockRecords.filter(r => r.type === type && (type === 'MEMBER' ? String(r.memberId) === userId : String(r.staffId) === userId));
    return HttpResponse.json({ success: true, message: 'Fetched history', data: filtered });
  }),

  http.get(managerMockApiUrl(ManagerAttendanceUrlConfig.BACKEND_API.MEMBERS), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const statusFilter = (url.searchParams.get('status') || '').trim().toUpperCase();
    const demoMember = search === 'demo-active'
      ? MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS.find((member) => member.status === 'ACTIVE')
      : search === 'demo-expired'
        ? MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS.find((member) => member.status === 'EXPIRED')
        : undefined;
    if (demoMember) return HttpResponse.json({ success: true, message: 'Fetched attendance members', data: { members: [demoMember] } });
    const members = MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS.filter((member) => {
      const matchesSearch = !search || member.id.toLowerCase().includes(search) || member.name.toLowerCase().includes(search) || member.phone.includes(search);
      const matchesStatus = !statusFilter || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    return HttpResponse.json({ success: true, message: 'Fetched attendance members', data: { members } });
  }),

  http.get(managerMockApiUrl(ManagerAttendanceUrlConfig.BACKEND_API.STAFF), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const staff = MANAGER_ATTENDANCE_STAFF_SNAPSHOTS.filter((member) =>
      !search || member.id.toLowerCase().includes(search) || member.name.toLowerCase().includes(search) || member.role.toLowerCase().includes(search),
    );
    return HttpResponse.json({ success: true, message: 'Fetched attendance staff', data: { staff } });
  }),

  http.post(managerMockApiUrl(ManagerAttendanceUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const body = await request.json() as { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string };
    const newRecord: Attendance = {
      id: `att-${mockAttendanceIdCounter++}`,
      memberId: body.memberId ? parseInt(body.memberId, 10) : undefined,
      staffId: body.staffId ? parseInt(body.staffId, 10) : undefined,
      date: body.date,
      checkIn: body.checkIn || '09:00 AM',
      type: body.type as 'MEMBER' | 'STAFF',
      status: 'Present' };
    mockRecords = [newRecord, ...mockRecords];
    return HttpResponse.json({ success: true, message: 'Attendance marked', data: newRecord });
  }),
];
