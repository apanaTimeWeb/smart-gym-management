// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceTypes';

export interface TrainerAttendanceSummaryCardProps {
  records: TrainerAttendanceRecord[];
}
