// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

import { FinanceExportFormat, PaymentStatus } from '@/backend_manager/modules/backend_manager/finance/finance.constants';

export class FinanceQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() memberId?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(PaymentStatus) status?: PaymentStatus;
  @IsOptional() @IsISO8601({ strict: false }) startDate?: string;
  @IsOptional() @IsISO8601({ strict: false }) endDate?: string;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
  @IsOptional() @IsEnum(FinanceExportFormat) format?: FinanceExportFormat;
}
