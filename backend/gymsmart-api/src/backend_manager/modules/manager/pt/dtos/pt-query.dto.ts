// RESPONSIBILITY: Validates Manager pt query inputs.
// FLOW: HTTP query -> PtQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class PtQueryDto extends PaginationQueryDto {
}
