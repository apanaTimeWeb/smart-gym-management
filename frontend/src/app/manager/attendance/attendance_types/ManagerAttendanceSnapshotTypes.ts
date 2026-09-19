// RESPONSIBILITY: Defines feature-owned attendance snapshot contracts returned by attendance endpoints.
export type ManagerAttendanceMemberStatus = 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'FROZEN' | 'SUSPENDED' | 'BANNED';
export type ManagerAttendanceStaffStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

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
