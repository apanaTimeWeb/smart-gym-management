// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsISO8601, IsOptional, IsString 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';

import { PaginationQueryDto 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_manager/core/dtos/pagination-query.dto';

import { AttendanceStatus, ManagerAttendancePersonType 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_manager/modules/backend_manager/attendance/attendance.constants';

export class AttendanceQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() userId?: string;
  @IsOptional() @IsEnum(ManagerAttendancePersonType) type?: ManagerAttendancePersonType;
  @IsOptional() @IsISO8601({ strict: false 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}) month?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(AttendanceStatus) status?: AttendanceStatus;
  @IsOptional() @IsISO8601({ strict: false 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}) date?: string;

  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

