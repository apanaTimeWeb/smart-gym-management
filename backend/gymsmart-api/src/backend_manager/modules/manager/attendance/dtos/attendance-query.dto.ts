// @ts-nocheck
// RESPONSIBILITY: Validates Manager attendance query inputs.
// FLOW: HTTP query -> AttendanceQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class AttendanceQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  userId!: string;

  @IsOptional()
@IsString()
  type!: MEMBER | STAFF;

  @IsOptional()
@IsString()
  month!: string;

}
