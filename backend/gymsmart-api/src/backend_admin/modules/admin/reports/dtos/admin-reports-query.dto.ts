// RESPONSIBILITY: Validates and normalizes frontend query/filter parameters for Admin reports.
// FLOW: HTTP query → AdminReportsQueryDto → repository allowlists → PostgreSQL query.

import { Type } from 'class-transformer';
import { IsOptional, IsString, IsIn, IsNumber } from 'class-validator';
import { CorePaginationQueryDto } from '@/backend_admin/core/dto/core-pagination-query.dto';

export class AdminReportsQueryDto extends CorePaginationQueryDto {
  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  gymId?: string;

  @IsOptional()
  @IsString()
  range?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  severity?: string;

  @IsOptional()
  @IsString()
  dateRange?: string;

  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @IsString()
  consumer?: string;
}
