import { http, HttpResponse } from 'msw';
import { MANAGER_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceConstants';
import { MOCK_ATTENDANCE_RECORDS, MOCK_ATTENDANCE_STATS } from '@/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_fixtures/ManagerAttendanceMockData';
import { MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS, MANAGER_ATTENDANCE_STAFF_SNAPSHOTS } from '@/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_fixtures/ManagerAttendanceQrMockData';
import { ManagerAttendanceUrlConfig } from '@/app/frontend_manager/manager_attendance/manager_attendance_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import type { Attendance } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes';


let mockRecords = [...MOCK_ATTENDANCE_RECORDS];
let mockAttendanceIdCounter = 100;

/**
 * @description Provides the ManagerAttendanceMockHandlers implementation for the attendance module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_fixtures/ManagerAttendanceMockData; @/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_fixtures/ManagerAttendanceQrMockData; @/app/frontend_manager/manager_attendance/manager_attendance_url_config; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
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
      const matchesStatus = !status || status === 'all' || (record.status || '').toLowerCase() === status;
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
    const demoMember = (() => { if (search === 'demo-active') return MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS.find((member) => member.status === MANAGER_ATTENDANCE_STATUS_VALUES.ACTIVE); return (() => { if (search === 'demo-expired') return MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS.find((member) => member.status === MANAGER_ATTENDANCE_STATUS_VALUES.EXPIRED); return undefined; })(); })();
    if (demoMember) return HttpResponse.json({ success: true, message: 'Fetched attendance members', data: { members: [demoMember] } });
    const members = MANAGER_ATTENDANCE_MEMBER_SNAPSHOTS.filter((member) => {
      const matchesSearch = !search || member.id.toLowerCase().includes(search) || member.name.toLowerCase().includes(search) || member.phone.includes(search);
      const matchesStatus = !statusFilter || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    if (search && members.length === 0) {
      return HttpResponse.json({ success: false, message: 'Member not found', data: null, error: 'NOT_FOUND', errorCode: 'ATTENDANCE.MEMBER.NOT_FOUND' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
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
    const duplicate = mockRecords.some((record) => record.date === body.date && (body.type === 'MEMBER' ? String(record.memberId) === String(body.memberId) : String(record.staffId) === String(body.staffId)));
    if (duplicate) {
      return HttpResponse.json({ success: false, message: 'Attendance already marked for this date', data: null, error: 'CONFLICT', errorCode: 'ATTENDANCE.RECORD.DUPLICATE' }, { status: MANAGER_HTTP_STATUS.CONFLICT });
    }
    const newRecord: Attendance = {
      id: `att-${mockAttendanceIdCounter++}`,
      memberId: body.memberId ? parseInt(body.memberId, 10) : undefined,
      staffId: body.staffId ? parseInt(body.staffId, 10) : undefined,
      date: body.date,
      checkIn: body.checkIn || '09:00 AM',
      type: body.type as 'MEMBER' | 'STAFF',
      status: MANAGER_ATTENDANCE_STATUS_VALUES.PRESENT };
    mockRecords = [newRecord, ...mockRecords];
    return HttpResponse.json({ success: true, message: 'Attendance marked', data: newRecord });
  }),
];
