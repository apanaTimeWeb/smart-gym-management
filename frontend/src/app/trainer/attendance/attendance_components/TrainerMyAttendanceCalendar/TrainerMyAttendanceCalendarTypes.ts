// RESPONSIBILITY: Prop contract for the trainer's monthly attendance calendar.
import type { AttendanceRecord } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

export interface TrainerMyAttendanceCalendarProps {
  records: AttendanceRecord[];
}
