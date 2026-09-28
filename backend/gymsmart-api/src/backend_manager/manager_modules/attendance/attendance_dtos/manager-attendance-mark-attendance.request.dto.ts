// RESPONSIBILITY: Owns the Manager attendance request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsOptional, IsString, IsEnum } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { AttendancePersonType } from '@/backend_manager/manager_modules/attendance/manager-attendance.constants';

export class ManagerAttendanceMarkAttendanceRequestDto extends CoreRequestDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  memberId!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  staffId!: string;

  @IsISO8601()
  @ApiProperty()
  date!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  checkIn!: string;

  @IsEnum(AttendancePersonType)
  @ApiProperty()
  type!: AttendancePersonType;

}

export { ManagerAttendanceMarkAttendanceRequestDto as AttendanceMarkAttendanceRequestDto };
