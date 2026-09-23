// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';

import { SalesRecordStatus } from '@/backend_manager/modules/backend_manager/sales/sales.constants';

import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class SalesQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(SalesRecordStatus) status?: SalesRecordStatus;
  @IsOptional() @IsISO8601({ strict:false }) startDate?: string;
  @IsOptional() @IsISO8601({ strict:false }) endDate?: string;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
}
