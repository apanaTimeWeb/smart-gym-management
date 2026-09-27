// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { AttendanceStatus, ManagerAttendancePersonType } from '@/backend_manager/manager_modules/attendance/manager-attendance.constants';

export class ManagerAttendanceQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() userId?: string;
  @IsOptional() @IsEnum(ManagerAttendancePersonType) type?: ManagerAttendancePersonType;
  @IsOptional() @IsISO8601({ strict: false }) month?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(AttendanceStatus) status?: AttendanceStatus;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
}

export { ManagerAttendanceQueryDto as AttendanceQueryDto };
