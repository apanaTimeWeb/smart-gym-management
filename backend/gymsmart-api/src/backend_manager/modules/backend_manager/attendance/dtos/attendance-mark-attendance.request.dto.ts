// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsOptional, IsString, IsEnum } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { AttendancePersonType } from '@/backend_manager/modules/backend_manager/attendance/attendance.constants';

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
