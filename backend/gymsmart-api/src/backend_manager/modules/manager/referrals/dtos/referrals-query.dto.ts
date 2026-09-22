// @ts-nocheck
// RESPONSIBILITY: Validates Manager referrals query inputs.
// FLOW: HTTP query -> ReferralsQueryDto -> read use case -> allowlisted repository query.

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class ReferralsQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsNumber()
  page!: number;

  @IsOptional()
@IsNumber()
  limit!: number;

  @IsOptional()
@IsString()
  search!: string;

  @IsOptional()
@IsString()
  status!: string;

}
