// RESPONSIBILITY: Validates Manager grievance query inputs.
// FLOW: HTTP query -> GrievanceQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class GrievanceQueryDto extends PaginationQueryDto {
}
