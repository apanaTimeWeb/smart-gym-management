import { AttendanceType } from '@/modules/attendance/utils/database.enums';
import { Attendance } from '@/modules/attendance/entities/attendance.entity';

export interface MarkAttendancePayload {
  memberId?: string;
  staffId?: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  type: AttendanceType;
}

export interface AttendanceResponse {
  message: string;
  data: Attendance | Attendance[] | any;
}
