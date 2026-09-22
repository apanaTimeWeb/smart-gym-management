// @ts-nocheck
// RESPONSIBILITY: Validates Manager finance query inputs.
// FLOW: HTTP query -> FinanceQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class FinanceQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  memberId!: string;

  @IsOptional()
@IsString()
  format!: csv | pdf;

}
