// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsISO8601, IsObject, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';
import { ReportsRange } from '@/backend_manager/manager_modules/reports/manager-reports.constants';

export class ManagerReportsQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() tab?: string;
  @IsOptional() @IsObject() params?: Record<string,string>;
  @IsOptional() @IsEnum(ReportsRange) range?: ReportsRange;
  @IsOptional() @IsISO8601({ strict:false }) startDate?: string;
  @IsOptional() @IsISO8601({ strict:false }) endDate?: string;
}

export { ManagerReportsQueryDto as ReportsQueryDto };
