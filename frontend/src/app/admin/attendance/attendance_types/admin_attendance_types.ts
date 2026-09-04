// RESPONSIBILITY: TypeScript types for the Admin Attendance module.
export interface AdminAttendanceRecord {
  id: string;
  memberId?: string;
  staffId?: string;
  name: string;
  type: "member" | "staff";
  checkIn: string;
  checkOut?: string;
  date: string;
  branch: string;
  status: "present" | "late" | "absent";
}
export interface AdminAttendanceStats {
  todayTotal: number;
  todayMembers: number;
  todayStaff: number;
  monthTotal: number;
}
export type AttendanceFilter = "all" | "member" | "staff";
