// @ts-nocheck
// RESPONSIBILITY: Validates Manager reports query inputs.
// FLOW: HTTP query -> ReportsQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class ReportsQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  tab!: string;

  @IsOptional()
@IsString()
  params?: Record<string,string>;

}
