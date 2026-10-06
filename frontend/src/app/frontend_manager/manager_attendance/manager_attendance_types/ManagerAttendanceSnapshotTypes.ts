// RESPONSIBILITY: Defines feature-owned attendance snapshot contracts returned by attendance endpoints.
import { ATTENDANCE_MEMBER_STATUS_VALUES, ATTENDANCE_STAFF_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceSharedConstants';
export type ManagerAttendanceMemberStatus = typeof ATTENDANCE_MEMBER_STATUS_VALUES[number];
export type ManagerAttendanceStaffStatus = typeof ATTENDANCE_STAFF_STATUS_VALUES[number];

export interface MemberSnapshot {
  id: string;
  name: string;
  phone: string;
  status: ManagerAttendanceMemberStatus;
  planName?: string;
  joinDate?: string;
}

export interface StaffSnapshot {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: ManagerAttendanceStaffStatus;
}
