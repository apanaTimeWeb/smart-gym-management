// RESPONSIBILITY: Owns the typed props contract for this component.
import type { AttendanceRecord } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

export interface TrainerAttendanceSummaryCardProps {
  records: AttendanceRecord[];
}
