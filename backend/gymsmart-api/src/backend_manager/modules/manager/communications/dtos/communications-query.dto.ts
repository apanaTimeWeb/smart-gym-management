// RESPONSIBILITY: Validates Manager communications query inputs.
// FLOW: HTTP query -> CommunicationsQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class CommunicationsQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  segment?: CommSegment;

}
