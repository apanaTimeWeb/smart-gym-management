// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsISO8601, IsObject, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';
import { ReportsRange } from '@/backend_manager/modules/backend_manager/reports/reports.constants';

export class ReportsQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() tab?: string;
  @IsOptional() @IsObject() params?: Record<string,string>;
  @IsOptional() @IsEnum(ReportsRange) range?: ReportsRange;
  @IsOptional() @IsISO8601({ strict:false }) startDate?: string;
  @IsOptional() @IsISO8601({ strict:false }) endDate?: string;
}
