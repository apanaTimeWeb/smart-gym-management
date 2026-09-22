// RESPONSIBILITY: Validates Manager inquiries query inputs.
// FLOW: HTTP query -> InquiriesQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class InquiriesQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  id?: string;

}
