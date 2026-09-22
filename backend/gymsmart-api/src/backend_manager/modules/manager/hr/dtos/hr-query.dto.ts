// RESPONSIBILITY: Validates Manager hr query inputs.
// FLOW: HTTP query -> HrQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class HrQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  id!: string;

  @IsOptional()
@IsString()
  staffId!: string;

  @IsOptional()
@IsString()
  month!: string;

}
