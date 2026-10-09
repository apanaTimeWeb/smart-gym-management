// RESPONSIBILITY: Owns the paginated Trainer Attendance record list result shape returned by the feature API.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceTypes';

export interface TrainerAttendanceListResult {
  records: TrainerAttendanceRecord[];
  total: number;
}
