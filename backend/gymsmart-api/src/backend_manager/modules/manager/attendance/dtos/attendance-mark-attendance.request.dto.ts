// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { AttendancePersonType } from '@/backend_manager/modules/manager/attendance/attendance.constants';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/attendance.
// FLOW: HTTP payload -> AttendanceMarkAttendanceRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsOptional, IsString, IsEnum } from 'class-validator';

export class AttendanceMarkAttendanceRequestDto extends CoreRequestDto {
  @IsOptional()
  @IsString()
  memberId!: string;

  @IsOptional()
  @IsString()
  staffId!: string;

  @IsISO8601()
  date!: string;

  @IsOptional()
  @IsString()
  checkIn!: string;

  @IsEnum(AttendancePersonType)
  type!: AttendancePersonType;

}
