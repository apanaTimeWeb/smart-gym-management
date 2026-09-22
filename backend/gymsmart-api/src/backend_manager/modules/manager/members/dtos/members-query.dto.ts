// RESPONSIBILITY: Validates Manager members query inputs.
// FLOW: HTTP query -> MembersQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class MembersQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  id?: string;

  @IsOptional()
@IsString()
  memberId?: string;

}
