// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { TimeRange } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.constants';

export class ManagerDashboardQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(TimeRange) range?: TimeRange;
  @IsOptional() @IsISO8601({ strict:false }) startDate?: string;
  @IsOptional() @IsISO8601({ strict:false }) endDate?: string;
}

export { ManagerDashboardQueryDto as DashboardQueryDto };
