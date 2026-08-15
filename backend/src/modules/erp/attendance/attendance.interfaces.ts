import { AttendanceType } from '@/modules/erp/attendance/utils/attendance.enums';
import { Attendance } from '@/modules/erp/attendance/entities/attendance.entity';

export interface MarkAttendancePayload {
  memberId?: string;
  staffId?: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  type: AttendanceType;
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  data: Attendance | Attendance[] | any;
}
