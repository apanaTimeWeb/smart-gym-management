// RESPONSIBILITY: Typed props contract for one sortable Attendance table header.
import type { AttendanceSortDirection, AttendanceSortField } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';

export interface TrainerAttendanceSortableHeaderProps {
  label: string;
  field: AttendanceSortField;
  sortBy: AttendanceSortField;
  sortDirection: AttendanceSortDirection;
  onSort: (field: AttendanceSortField) => void;
}
