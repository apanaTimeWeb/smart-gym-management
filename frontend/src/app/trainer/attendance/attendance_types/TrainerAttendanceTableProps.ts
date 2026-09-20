// RESPONSIBILITY: Props contract for the Attendance table view.
import type { AttendanceRecord, } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';
import type { AttendanceSortDirection, AttendanceSortField } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';
export interface TrainerAttendanceTableProps {
  records: AttendanceRecord[];
  totalRecords: number;
  isPending: boolean;
  search: string;
  filterDate: string;
  currentPage: number;
  sortBy: AttendanceSortField;
  sortDirection: AttendanceSortDirection;
  onPageChange: (page: number) => void;
  onSort: (field: AttendanceSortField) => void;
}
