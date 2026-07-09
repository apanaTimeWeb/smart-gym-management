import { AttendanceType } from '@/common/enums/database.enums';
import { Attendance } from '@/modules/attendance/entities/attendance.entity';

export interface MarkAttendancePayload {
  memberId?: number;
  staffId?: number;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  type: AttendanceType;
}

export interface AttendanceResponse {
  message: string;
  data: Attendance | Attendance[] | any;
}
