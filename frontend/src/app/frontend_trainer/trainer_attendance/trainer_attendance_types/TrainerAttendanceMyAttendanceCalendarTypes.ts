// RESPONSIBILITY: Prop contract for the trainer's monthly attendance calendar.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceTypes';

export interface TrainerAttendanceMyAttendanceCalendarProps {
  records: TrainerAttendanceRecord[];
}
