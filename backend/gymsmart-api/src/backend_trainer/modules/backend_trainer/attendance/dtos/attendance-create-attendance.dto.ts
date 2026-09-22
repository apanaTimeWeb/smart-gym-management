// RESPONSIBILITY: Validates the Trainer attendance creation request shape only.
// FLOW: HTTP body → AttendanceCreateAttendanceDto → AttendanceCreateService.

import { AttendanceCheckInMethod, AttendanceRecordType } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-enums';
import { IsBoolean, IsEnum, IsIn, IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';

export class AttendanceCreateAttendanceDto {
  @IsOptional() @IsEnum(AttendanceRecordType) type?:AttendanceRecordType;
  @IsOptional() @IsUUID() memberId?: string;
  @IsOptional() @IsUUID() staffId?: string;
  @IsOptional() @IsISO8601() date?: string;
  @IsOptional() @IsString() checkIn?: string;
  @IsOptional() @IsString() checkOut?: string;
  @IsOptional() @IsEnum(AttendanceCheckInMethod) checkInMethod?:AttendanceCheckInMethod;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsBoolean() isSelfCheckIn?: boolean;
}
