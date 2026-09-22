// RESPONSIBILITY: Validates Manager plans query inputs.
// FLOW: HTTP query -> PlansQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class PlansQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  id!: string;

}
