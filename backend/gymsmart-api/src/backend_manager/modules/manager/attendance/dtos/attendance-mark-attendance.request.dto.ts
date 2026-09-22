import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { AttendancePersonType } from '@/modules/manager/attendance/attendance.constants';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/attendance.
// FLOW: HTTP payload -> AttendanceMarkAttendanceRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class AttendanceMarkAttendanceRequestDto extends CoreRequestDto {
  @IsOptional()
  @IsString()
  memberId?: string;

  @IsOptional()
  @IsString()
  staffId?: string;

  @IsISO8601()
  date!: string;

  @IsOptional()
  @IsString()
  checkIn?: string;

  @IsEnum(AttendancePersonType)
  type!: AttendancePersonType;

}
